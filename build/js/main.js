Jma.module('Components', function(Components, Jma, Backbone, Marionette, $, _) {
    Components.Dicts = {};

    Components.Dicts.emojis = [
        "smile", "iphone", "girl", "smiley", "heart", "kiss", "copyright", "coffee",
        "a", "ab", "airplane", "alien", "ambulance", "angel", "anger", "angry",
        "arrow_forward", "arrow_left", "arrow_lower_left", "arrow_lower_right",
        "arrow_right", "arrow_up", "arrow_upper_left", "arrow_upper_right",
        "art", "astonished", "atm", "b", "baby", "baby_chick", "baby_symbol",
        "balloon", "bamboo", "bank", "barber", "baseball", "basketball", "bath",
        "bear", "beer", "beers", "beginner", "bell", "bento", "bike", "bikini",
        "bird", "birthday", "black_square", "blue_car", "blue_heart", "blush",
        "boar", "boat", "bomb", "book", "boot", "bouquet", "bow", "bowtie",
        "boy", "bread", "briefcase", "broken_heart", "bug", "bulb",
        "person_with_blond_hair", "phone", "pig", "pill", "pisces", "plus1",
        "point_down", "point_left", "point_right", "point_up", "point_up_2",
        "police_car", "poop", "post_office", "postbox", "pray", "princess",
        "punch", "purple_heart", "question", "rabbit", "racehorse", "radio",
        "up", "us", "v", "vhs", "vibration_mode", "virgo", "vs", "walking",
        "warning", "watermelon", "wave", "wc", "wedding", "whale", "wheelchair",
        "white_square", "wind_chime", "wink", "wink2", "wolf", "woman",
        "womans_hat", "womens", "x", "yellow_heart", "zap", "zzz", "+1",
        "-1"
    ];



    Components.Form = Components.Form || {};
    Components.Form.editors = Components.Form.editors || {};
    /**
     * 初始化参数
     * model    : 表单绑定数据，包含Schema
     * submitButton : 表单提交按钮显示文字
     * processing   : 表单提交按钮在表单提交阶段显示文字，如果没有该参数，则表单提交阶段文字无变化
     */
    //增加tips
    Backbone.Form.Field = Backbone.Form.Field.extend({
        templateData: function() {
            var schema = this.schema;
            return {
                help: schema.help || '',
                title: schema.title,
                description: schema.description ? '<span class="form-tips">' + schema.description + '</span>' : '',
                titleHTML: schema.titleHTML,
                fieldAttrs: schema.fieldAttrs,
                editorAttrs: schema.editorAttrs,
                key: this.key,
                editorId: this.editor.id
            };
        },
    })

    Components.Form = Backbone.Form.extend({
        events: {
            'submit': 'onSubmit',
            'click .cancel-btn': 'onCancel'
        },
        template: _.template('\
        <form class="form-horizontal" role="form">\
          <div data-fieldsets></div>\
          <div class="form-group form-bar"><div class="col-md-12">\
            <button class="btn btn-success" type="submit">提交</button>\
            <button class="btn btn-default cancel-btn" type="button">取消</button>\
          </div></div>\
        </form>\
      '),
        initialize: function(options) {
            // console.log('form options',options)
            Backbone.Form.prototype.initialize.apply(this, arguments);
            this.options = _.extend({ submitButton: '提交' }, options);
            this.errors = {};
            this.complete = true;
            this.submitButton = null;
            //组件share 判空补丁
            Jma.Components.Form.validators.required = function(options) {
                options = _.extend({
                    type: 'required',
                    message: Jma.Components.Form.validators.errMessages.required
                }, options);
                return function required(value) {
                    // console.log(value);
                    options.value = value;

                    var err = {
                        type: options.type,
                        message: _.isFunction(options.message) ? options.message(options) : options.message
                    };
                    if (value === '-0' || value === null || value === undefined || value === false || value === '' || (_.isArray(value) && value.length === 0)) return err;
                };
            };
            this.on('field:change field:blur', this.validateField, this);
            this.on('validate', this.setButtonState, this);
            this.model && this.model.on('request', this.onRequest, this);
            this.model && this.model.unbind('change') && this.model.on('change', this.onModelChange, this);
            if (this.model && !this.model.isNew() && this.options.patch) this.old_model = this.model.clone();
        },
        handleEditorEvent: function(e, editor) {
            Backbone.Form.prototype.handleEditorEvent.apply(this, arguments);
            this.trigger('field:' + e, editor.key);
        },
        validate: function() {
            var errors = Backbone.Form.prototype.validate.apply(this, arguments);
            this.errors = errors == null ? {} : errors;
            this.trigger('validate', this.errors);
            return errors;
        },
        validateField: function(key) {
            if (!this.submitButton) return;
            var error = this.fields[key].validate();
            error ? this.errors[key] = error : delete this.errors[key];
            this.trigger('validate', this.errors);
            return this.errors;
        },
        validateEditors: function() {
            for (var i in this.fields) {
                var error = this.fields[i].editor.validate();
                if (error)
                    this.errors[i] = error;
            };
            this.trigger('validate', this.errors);
            return this.errors;
        },
        setButtonState: function() {
            _.isEmpty(this.errors) && this.complete ? this.submitButton.removeClass('disabled').removeAttr('disabled').html(this.options.submitButton) : this.submitButton.addClass('disabled').attr('disabled', 'disabled') && this.options.processing && this.submitButton.html('<i class="fa fa-refresh fa-spin"></i> ' + this.options.processing)
        },
        render: function() {
            Backbone.Form.prototype.render.apply(this, arguments);
            this.trigger('render');
            this.values = this.getValue();
            this.submitButton = this.$el.find(':submit')
                /*.wrap('<div class="form-group" />')
                .wrap('<div class="col-md-12" />')
                .addClass('btn-primary')
                .addClass('pull-right');*/

            this.validateEditors();

            return this;
        },
        onShow: function() {
            this.$el.find('.form-tips').children().addClass('text-muted').tooltip({ container: 'body' });
        },
        resetValue: function() {
            this.setValue(this.values);
        },
        templateData: function() {
            var data = {
                submitButton: this.options.submitButton
            };
            return data;
        },
        // templateData: function() {
        //   var schema = this.schema;

        //   return {
        //     help: schema.help || '',
        //     title: schema.title,
        //     description: schema.description,
        //     titleHTML: schema.titleHTML,
        //     fieldAttrs: schema.fieldAttrs,
        //     editorAttrs: schema.editorAttrs,
        //     key: this.key,
        //     editorId: this.editor.id
        //   };
        // },
        onSubmit: function(e) {

            var that = this;

            e.preventDefault();

            if (this.commit())
                return;

            var saveHandle;
            var saveParams = {
                    success: function(model, response) {
                        that.trigger('success', { model: model, response: response });
                    },
                    error: function(model, response) {
                        that.trigger('error', { model: model, response: response });
                    }
                }
                // ie fix里的 placeholder 去掉
            if (!('placeholder' in document.createElement('input'))) {
                var schema = this.model.schema ? this.model.schema : this.options.schema;
                _.each(schema, function(item, key) {
                    if (item.editorAttrs && item.editorAttrs.placeholder) {
                        if (that.model.get(key) == item.editorAttrs.placeholder) {
                            that.model.set(key, '');
                        }
                    }
                })
            }

            if (!this.model.isNew() && this.options.patch) {
                if (this.options.patch) saveParams.patch = true;
                var patchData = this.old_model.changedAttributes(this.model.toJSON());
                if (_.size(patchData) > 0) saveHandle = this.model.save(patchData, saveParams);
                else {
                    this.complete = true;
                    this.setButtonState();
                    return;
                }
            } else {
                saveHandle = this.model.save(this.model.toJSON(), saveParams);
            }

            saveHandle
                .always(function() {
                    that.complete = true;
                    that.setButtonState();
                });
        },
        onModelChange: function() {
            var values = this.model.toJSON();
            this.setValue(values);
            this.validateEditors();
            this.setButtonState();
        },
        onRequest: function(model, xhr) {
            var that = this;
            that.complete = false;
            this.setButtonState();
        },
        onCancel: function(evt) {
            this.trigger('form:cancel')
        }
    });
    // BacForm.Field = 



    Components.Form.editors.DatePicker = Components.Form.editors.Text.extend({
        defaultValue: '',
        previousValue: '',
        defaults: {
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN',
            todayBtn: false
        },
        events: {
            'keyup': 'determineChange',
            'keypress': function(event) {
                var self = this;
                setTimeout(function() {
                    self.determineChange();
                }, 0);
            },
            'select': function(event) {
                this.trigger('select', this);
            },
            'focus': function(event) {},
            'blur': function(event) {}
        },
        initialize: function(options) {
            var that = this;
            Components.Form.editors.Text.prototype.initialize.call(this, options);
            this.value = this.defaultValue;
            this.value = (new Date()).getTime() / 1000;
            this.defaultValue = this.value;
            this.$el.addClass('datepicker-input');
            // all the customized options should be set on schema.options
            this.$el.datepicker(_.extend(_.clone(this.defaults), this.schema.options))
                .on('changeDate', function(e) {
                    that.value = parseInt(e.date.getTime() / 1000);
                    that.checkChange();
                })
                .on('clearDate', function(e) {
                    that.setValue('-0');
                });
            this.DatePicker = this.$el.data('datepicker');
            this.setValue(this.value);
        },
        determineChange: function(event) {
            // 不再检测输入栏内容变化
            return;
        },
        getValue: function() {
            return this.value;
        },
        setValue: function(value) {
            this.value = value == '' ? '-0' : value;
            if (this.value == '-0') {
                return this.value;
            } else {
                var date = new Date(value * 1000);
                this.DatePicker.setDate(date);
            }
        },
        checkChange: function(event) {
            Components.Form.editors.Text.prototype.determineChange.call(this, event);
        }
    });



    Components.Form.editors.NotNullDatePicker = Components.Form.editors.Text.extend({
        defaultValue: '',
        defaults: {
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN',
            todayBtn: false
        },
        initialize: function(options) {
            var that = this;
            Components.Form.editors.Text.prototype.initialize.call(this, options);
            this.value = this.defaultValue;
            this.defaultValue = this.value;
            this.$el.addClass('datepicker-input');
            this.options = _.defaults(options, this.defaults);

            this.$el.datepicker(this.options)
                .on('hide', function(e) {
                    if (typeof(e.date) == "undefined") {
                        that.setValue(parseInt(new Date().getTime() / 1000));
                    } else {
                        that.value = parseInt(e.date.getTime() / 1000);
                        that.form && that.form.trigger(that.options.key + ':change', that.form, that) || that.trigger('change', that);
                    }
                })
                .on('changeDate', function(e) {
                    if (typeof(e.date) == "undefined") {
                        that.setValue(parseInt(new Date().getTime() / 1000));
                    } else {
                        that.value = parseInt(e.date.getTime() / 1000);
                        that.form && that.form.trigger(that.options.key + ':change', that.form, that) || that.trigger('change', that);
                    }
                });

            this.DatePicker = this.$el.data('datepicker');
            this.setValue(this.value);
        },
        determineChange: function(event) {
            // 不再检测输入栏内容变化
            return;
        },
        getValue: function() {
            return this.value;
        },
        setValue: function(value) {
            // console.log('setValue',value)
            /*if(!!value){
              var d = new Date();
              d.setTime(value*1000);
              this.DatePicker.setDate(d);
            }*/
            this.value = value;
            var date = new Date(value * 1000);
            this.DatePicker.setDate(date);
        }
    });

    Components.Form.editors.TagsInput = Components.Form.editors.Text.extend({
        defaults: {
            freeInput: true,
            itemValue: 'id',
            itemText: 'name',
        },
        // Collection: Jma.Entities.Collection,
        Collection: Backbone.Collection,
        initialize: function(options) {
            var that = this;
            this.$el.on('change', function() {
                that.trigger('change', that);
                if ($(that.$el).parents('.form-group').hasClass('has-error')) {
                    $(that.$el).parents('.form-group').find('.bootstrap-tagsinput').css({ border: '1px red solid' });
                } else {
                    $(that.$el).parents('.form-group').find('.bootstrap-tagsinput').css({ border: '1px solid #ccc' });
                }
            });
            Components.Form.editors.Text.prototype.initialize.call(this, options);
            if (this.defaults.items) {
                var items = this.defaults.items;
            } else {
                var items = 8;
            }
            this.collection = options.schema.collection || this.collection || new this.Collection;

            this.options = {};
            // 接受schema传参
            if (options.schema.options) this.options = options.schema.options;
            this.options = _.extend(this.options, this.defaults, {
                typeahead: {
                    source: function(query) {
                        var defer = $.Deferred();
                        that.collection.on('reset', function() {
                            defer.resolve(this.toJSON());
                        });
                        that.collection.fetch({ data: { s: query }, reset: true });
                        return defer;
                    },
                    matcher: function(item) {
                        return item;
                    },
                    items: items
                },
                tagClass: this.tagClass
            }, options.schema.tagsinput);
            this.form.on('render', this.onRender, this);
        },
        tagClass: function(item) {
            return 'label label-info';
        },
        getValue: function() {
            return this.$el.tagsinput('items');
        },
        setValue: function(value) {
            var that = this;
            //this.$el.tagsinput('removeAll');
            if (_.isArray(value)) {
                _.each(value, function(item, i) {
                    that.$el.tagsinput('add', item);
                });
            }
        },
        render: function() {
            return this;
        },
        onRender: function() {
            var self = this;
            this.$el.tagsinput(this.options);
            this.setValue(this.value);
            $(this.$el).parent().delegate('.bootstrap-tagsinput input', 'blur', function() {
                self.$el.blur();
                if ($(self.$el).parents('.form-group').hasClass('has-error')) {
                    $(this).parents('.bootstrap-tagsinput').css({ border: '1px red solid' });
                } else {
                    $(this).parents('.bootstrap-tagsinput').css({ border: '1px solid #ccc' });
                }
            })
        },
        remove: function() {
            this.$el.datepicker('remove')
            Components.Form.editors.Text.prototype.remove.apply(this, arguments);
        },
        addItem: function(item) {
            this.$el.tagsinput('add', item);
        }
    });
    /**
     * 上传文件基础组件，视图上只包含一个按钮
     * 参数说明
     *    通过表单Schema 传入上传组件相关参数
     *    url 文件上传目标地址
     *    mutiple 是否多文件上传
     *    title 按钮文字
     *    params 文件上传参数，如 app_type/app_id
     */
    Components.Form.editors.BaseUploader = Components.Form.editors.Base.extend({
        defaults: {
            multiple: true, // 多文件上传
            params: { app_type: 'Ehrs_app_spms', app_id: 'project_tmp_id' }, // 上传文件参数 如app_type/app_id等
            url: '/devp/uploader/upload.php'
        },
        initialize: function(options) {
            _.bindAll(this, 'fileAdd', 'fileRemove', 'fileInvalid', 'tooManyFile', 'beforeUpload', 'uploadStart', 'uploadAbort', 'uploadComplete', 'uploadError', 'uploadProgress', 'render', '_showAttaches', 'initUploader');
            Components.Form.editors.Base.prototype.initialize.apply(this, arguments);
            _.extend(this, this.defaults, _.pick(options.schema, 'url', 'title', 'params', 'multiple', 'collectionName', 'viewsName', 'button', 'dropZone'));
            // if (!this.button) throw new Error("Upload button must be specified.");
            this.collectionName = this.collectionName || Backbone.Collection;
            this.viewsName = this.viewsName || Jma.Views.AttachesView;
            // this.template = this.template || Jma.Entities.Collection;
            // this.collection = new Jma.Entities.Collection(this.model.get(this.key));
            this.collection = new this.collectionName(this.model.get(this.key));
            this.collection.on('add remove reset', this._showAttaches);
            this.initUploader();
            // setTimeout(this.render,0);
        },
        validate: function() {
            // 如果有文件正在上传，则返回false
            var err = {
                type: 'uploader',
                message: '文件正在上传，请稍后...'
            };
            if (this.uploader && this.uploader.countFiles('UPLOADING')) return err;
        },
        // 初始化上传按钮
        initUploader: function() {
            this.uploader = new Uploader({
                selectButton: this.button,
                url: this.url,
                data: this.params,
                acceptSize: [null, 50 * 1024],
                dropZone: this.dropZone,
                errors: {
                    invalidType: "The file '{{fileName}}' is not valid. Please upload only files with the following extensions: {{allowedExtensions}}.",
                    sizeTooSmall: "The file '{{fileName}}' is too small. Please upload only files bigger than {{allowedMinSize}}.",
                    sizeTooLarge: "文件：'{{fileName}}'太大了,请重新上传小于50MB的文件.",
                    tooManyFiles: "Can not upload the file '{{fileName}}'', because you can upload only {{maxFiles}} file(s).",
                    networkError: "There was a problem uploading the file '{{fileName}}'. Please try uploading that file again."
                },
                headers: {
                    "Accept": "application/json, text/javascript, */*; q=0.01"
                }
            });
            this.uploader
                .on("fileAdd", this.fileAdd)
                .on("fileRemove", this.fileRemove)
                .on("fileInvalid", this.fileInvalid)
                .on("tooManyFile", this.tooManyFile)
                .on("beforeUpload", this.beforeUpload)
                .on("uploadStart", this.uploadStart)
                .on("uploadProgress", this.uploadProgress)
                .on("uploadAbort", this.uploadAbort)
                .on("uploadComplete", this.uploadComplete)
                .on("uploadFail", this.uploadError);
        },
        destroy: function() {
            // destroy uploader instance to avoid the duplicate events trigger issue
            this.uploader.destroyAll();
        },
        _showAttaches: function() {
            if (this.collection.length == 0) this.$el.hide();
            else this.$el.show();
        },
        render: function(options) {
            this._initAttachesView();
            this.$el.html(this.attachesView.$el);
            this._showAttaches();
            return this;
        },
        _initAttachesView: function() {
            if (this.attachesView) return;
            this.attachesView = new this.viewsName({
                collection: this.collection
            });
            this.attachesView.render();
            this.attachesView.on('childview:removeAttach', function(childview, args) {
                args.model.destroy();
            })
        },
        getValue: function() {
            // TODO: 数据需要格式化
            return this.collection.toJSON();
        },
        // 文件格式为 [{id:,name:,...},...]
        setValue: function(value) {
            if (!_(value).isArray()) {
                throw new Error("文件格式错误");
            }
            this.collection.reset(value);
        },
        // 将上传成功后的文件添加到列表中
        addUploaded: function(file) {
            this.collection.add(file);
        },
        // 删除已上传的文件  -- 貌似废掉了
        removeUploaded: function(file_id) {
            this.setValue(_.reject(this.getValue(), function(f) {
                return f.id == file_id;
            }));
        },
        // 更新文件显示列表
        updateList: function(files) {},
        fileInvalid: function(name, message) {},
        tooManyFile: function(name, message) {},
        beforeUpload: function(uniqueId, name, data, xhr) {},
        uploadStart: function(uniqueId, name) {},
        uploadComplete: function(uniqueId, name, resp, status, xhr) {
            if (status != 200) return;
            resp = JSON.parse(resp);
            var fileinfo = _.pick(resp, 'id', 'name', 'file_size', 'file_type', 'show_name', 'type');
            if (resp['file_type'] == 'Ehrs_n_image') fileinfo.thumb = resp.append.thumbnails.link;
            this.collection.get(uniqueId).clear({ silent: true }).set(fileinfo);
        },
        uploadError: function(uniqueId, name, message) {},
        uploadProgress: function(uniqueId, name, loaded, total) {
            if (!this.collection.get(uniqueId)) return;
            this.collection.get(uniqueId).set({ loaded: loaded, total: total });
        },
        fileAdd: function(uniqueId, name, file) {
            // 将准备上传的文件添加到Collection中
            this.collection.add(_.extend({}, file, { id: uniqueId, uploading: true }));
        },
        fileRemove: function(uniqueId, name) {},
        uploadAbort: function(uniqueId, name) {}
    });




    Components.Form.editors.CheckboxTextArea = Components.Form.editors.Text.extend({
        tagName: 'textarea',
        events: {
            'keydown': 'getTextareaValue',
            'keyup': 'setTextareaValue'
        },
        getTextareaValue: function() {
            this.val = this.$el.val();
            if (this.val != '' && this.val.split('')[this.val.length - 1] != ',') this.val = this.val + ',';
            this.$el.val('');
        },
        setTextareaValue: function() {
            this.$el.val(this.val);
        },
        initialize: function(options) {},
        reder: function() {
            return this;
        }
    });




    /**
     * 严格整形
     */
    Components.Form.editors.Integer = Components.Form.editors.Number.extend({
        onKeyPress: function(event) {
            var self = this,
                delayedDetermineChange = function() {
                    setTimeout(function() {
                        self.determineChange();
                    }, 0);
                };

            //Allow backspace
            if (event.charCode === 0) {
                delayedDetermineChange();
                return;
            }

            //Get the whole new value so that we can prevent things like double decimals points etc.
            var newVal = this.$el.val()
            if (event.charCode != undefined) {
                newVal = newVal + String.fromCharCode(event.charCode);
            }

            var numeric = /^[0-9]*?$/.test(newVal);

            if (numeric) {
                delayedDetermineChange();
            } else {
                event.preventDefault();
            }
        },
    });


    /**
     * Backbone Selected
     * selector:{type:'BootstrapSelect',title:'Title',options:['请选择','Mr', 'Mrs', 'Ms'],style:'default'}
     * selector:{type:'BootstrapSelect',title:'Title',options:[{label:'先生',val:'Mr'}, {label:'小姐',val:'Ms'}, {label:'女士',val:'Mrs'}],style:'default'}
     * selector:{type:'BootstrapSelect',title:'Title',options:collection,style:'default'}
     */
    //TODO refactoring thie component
    Components.Form.editors.BootstrapSelect = Components.Form.editors.Select.extend({
        className: 'btn-group split-dropdown-menu',
        tagName: 'div',
        events: {
            'change': function(event) {
                this.trigger('change', this);
            },
            'focus': function(event) {
                this.trigger('focus', this);
            },
            'blur': function(event) {
                this.trigger('blur', this);
            },
            'click li a': 'select'
        },
        initialize: function(options) {
            Components.Form.editors.Select.prototype.initialize.call(this, options);
            this.template = options.template || this.constructor.template;
        },
        render: function() {
            this.schema = _.extend({}, { style: 'default' }, this.schema);
            // TODO: 区分Collection/Array/html
            this.$el.append(this.template({ action: this.schema.options[0], style: this.schema.style }))
            this.setOptions(this.schema.options);
            if (typeof this.schema.size == "undefined") {
                this.schema.size = 1;
            }
            //yjl 不允许编辑
            if (this.schema.disabled) {
                this.$el.find('button').attr('disabled', 'true');
            }
            this.$el.attr('size', this.schema.size);
            return this;
        },
        select: function(evt) {
            evt.preventDefault();
            this.setValue($(evt.target).attr('value'));
            this.trigger('change', this);
        },
        getValue: function() {
            // TODO: 区分对象和数组
            var options = this.schema.options,
                curaction = this.$('.btn-actionname').html(),
                value = this.$('.btn-actionname').data("value");
            if (_.isArray(options)) {
                if (!curaction) curaction = options[0].label;
                // 这句有问题，val和label是有可能不一致的比如{val:2,label:2015.05.10V2}，如果因为val为数字，就把label也整型化，会导致label改变，从而导致findWhere找不到值而产生bug
                // if( typeof(options[0].val) == 'number' ) curaction = parseInt(curaction);
                var obj = _.findWhere(options, { label: curaction });
                if (obj)
                    return obj.val;
                else
                    return '';
            } else if (options instanceof Backbone.Collection) {
                return value;
            } else {
                return _.findWhere(options, ({ label: curaction }));
            }
        },
        setValue: function(value) {
            var options = this.schema.options,
                curaction;
            if (options instanceof Backbone.Collection) {
                if (options.length > 0) {
                    value = (_.isUndefined(value) || _.isUndefined(options.get(value))) ? options.at(0).get('id') : value;
                    curaction = options.get(value).get(this.getkeys()['label']);
                } else {
                    curaction = '';
                }
            } else if (_.isArray(options) || _.isObject(options)) {
                if (!value) value = options[0].val;
                if (typeof(options[0].val) == 'number') value = parseInt(value);
                //针对本系统数据格式做的兼容！满足id name不需要转换数据格式
                if (typeof(value) == 'object') value = value.id;
                if (value == '') {
                    curaction = ''
                } else {
                    var item = _.findWhere(options, { val: value });
                    curaction = item ? item.label : '';
                }
            } else {
                curaction = value;
            }
            if (curaction == '') curaction = '&nbsp;';
            this.$('.btn-actionname').html(curaction);
            this.$('.btn-actionname').data("value", value);
        },
        getkeys: function() {
            if (typeof this.schema.labelval == 'undefined')
                return { val: "val", label: "label" };
            return this.schema.labelval;
        },
        renderOptions: function(options) {
            var $select = this.$el.find('.dropdown-menu'),
                html;
            if (options instanceof Backbone.Collection) {
                options = options.toJSON();
                var labelval = this.schema.labelval;
                if (!!options[0]) {
                    if (typeof labelval == "undefined") {
                        var ll = { val: "val", label: "label" }
                    } else {
                        var ll = labelval;
                    }
                    options = _.map(options, function(val) {
                        return { val: val[ll.val], label: val[ll.label] }
                    });
                } else {
                    options = [{ val: '', label: '请选择' }];
                }
            }
            html = this._getOptionsHtml(options);
            $select.html(html);
            this.setValue(this.value);
        },
        _arrayToHtml: function(array) {
            var html = [];
            //Generate HTML
            _.each(array, function(option) {
                if (_.isObject(option)) {
                    if (option.group) {
                        html.push('<optgroup label="' + option.group + '">');
                        html.push(this._getOptionsHtml(option.options))
                        html.push('</optgroup>');
                    } else {
                        var val = (option.val || option.val === 0) ? option.val : '';
                        var inner = (option.level || option.level == 2) ? '&nbsp;&nbsp;&nbsp;&nbsp;' + option.label : option.label;
                        html.push('<li title="' + inner + '"><a class="ellipsis" href="#" value="' + val + '">' + inner + '</a></li>');
                    }
                } else {
                    html.push('<li title="' + option + '"><a class="ellipsis" href="#" value="' + option + '">' + option + '</a></li>');
                }
            }, this);
            return html.join('');
        }
    }, {
        template: _.template('\
      <button type="button" class="btn btn-<%= style %> btn-actionname ellipsis yjl-btn yjl-title"><%= action %></button>\
      <button type="button" class="btn btn-<%= style %> dropdown-toggle yjl-title-btn" data-toggle="dropdown" aria-expanded="false">\
      <span class="caret"></span>\
      <span class="sr-only">Toggle Dropdown</span>\
      </button>\
      <ul class="dropdown-menu" role="menu"></ul>\
    ', null, Components.Form.templateSettings),
    });



    /**
     * selector:title:'title',type:'setSelect',size:'1',labelval:{label:"name",val:"id"},options:Collection
     * labelval:{label:"name",val:"id"} name 和 id 是 Collection 返回的数据的字段名 用来指定下拉列表的内容和对应值
     * size:"1"  设置select默认显示几行内容，不设置则为1.
     */
    Components.Form.editors.setSelect = Components.Form.editors.Select.extend({
        render: function() {
            this.setOptions(this.schema.options);
            // if(typeof this.schema.size =="undefined"){
            //   this.schema.size = 1;
            // }
            // this.$el.attr('size',this.schema.size);
            return this;
        },
        renderOptions: function(options) {
            var labelval = this.schema.labelval;
            if (options instanceof Backbone.Collection) {
                options = options.toJSON();
            }
            if (!!options[0]) {
                if (typeof labelval == "undefined") {
                    var ll = { val: "val", label: "label" }
                } else {
                    var ll = labelval;
                }
                options = _.map(options, function(val) {
                    return { val: val[ll.val], label: val[ll.label] }
                });
            } else {
                // options = options.toJSON();
                options = [{ val: 0, label: '请选择' }];
            }
            var $select = this.$el,
                html;
            html = this._getOptionsHtml(options);
            $select.html(html);
            if (!!this.value) {
                this.setValue(this.value);
            } else {
                this.setValue(options[0].val);
            }
        },
    });



    /**
     * Backbone Checkboxes
     * selector:{type:'BootstrapCheckboxes',title:'Title',options:[{val:'inprogress',label:'进行中'},{val:'notstarted',label:'未开始'},{val:'closed',label:'已结束'}]}
     */
    Components.Form.editors.BootstrapCheckboxes = Components.Form.editors.Checkboxes.extend({
        className: 'BootstrapCheckboxes',
        /**
         * Create the checkbox list HTML
         * @param {Array}   Options as a simple array e.g. ['option1', 'option2']
         *            or as an array of objects e.g. [{val: 543, label: 'Title for object 543'}]
         * @return {String} HTML
         */
        _arrayToHtml: function(array) {
            var html = $();
            var self = this;
            this._array = array;
            _.each(array, function(option, index) {
                var itemHtml = $('<li>');
                if (self.schema.liClass) itemHtml.addClass(self.schema.liClass);
                if (_.isObject(option)) {
                    if (option.group) {
                        var originalId = self.id;
                        self.id += "-" + self.groupNumber++;
                        itemHtml = $('<fieldset class="group">').append($('<legend>').text(option.group));
                        itemHtml = itemHtml.append(self._arrayToHtml(option.options));
                        self.id = originalId;
                        close = false;
                    } else {
                        var val = (option.val || option.val === 0) ? option.val : '';
                        if (option.labelHTML) {
                            itemHtml.append($('<label for="' + self.id + '-' + index + '">').html(option.labelHTML));
                        } else {
                            itemHtml.append($('<label for="' + self.id + '-' + index + '">').text(option.label));
                        }
                        itemHtml.find('label').prepend($('<input type="checkbox" name="' + self.getName() + '" id="' + self.id + '-' + index + '" />').val(val));
                    }
                } else {
                    itemHtml.append($('<label for="' + self.id + '-' + index + '">').text(option));
                    itemHtml.find('label').prepend($('<input type="checkbox" name="' + self.getName() + '" id="' + self.id + '-' + index + '" />').val(option));
                }
                html = html.add(itemHtml);
            });
            if (array.length == 0 && this.schema.nullTip) html = $('<li><span class="nullTip">' + this.schema.nullTip + '</span></li>');
            return html;
        },
    });

    /*
     * Backbone Collection Editor
     */
    Components.Form.editors.BBC = Components.Form.editors.Base.extend({
        initialize: function(options) {
            Components.Form.editors.Base.prototype.initialize.apply(this, arguments);
            _.extend(this, this.defaults, options.schema);
            if (this.viewConstructor == null) {
                throw new Error('Missing viewConstructor');
            }

            if (this.collection == null) {
                if (this.collectionConstructor != null) {
                    this.collection = new this.collectionConstructor(this.model.get(this.key));
                } else {
                    throw new Error('Missing collection & collectionConstructor');
                }
            }

            this.collection.on('add remove', this._showCollection);
            this.collection.toJSON = function() {
                // only post the checked models to server
                this.reset(this.where({ checked: true }));
                return Backbone.Collection.prototype.toJSON.apply(this, arguments);
            };
            this.collection.fetch({ reset: true });
        },
        render: function(options) {
            this._initCollectionView();
            this.$el.html(this.collectionView.$el);
            this._showCollection();
            return this;
        },
        getValue: function() {
            return this.collection.toJSON();
        },
        setValue: function(value) {
            if (!_(value).isArray()) {
                throw new Error('Format Error');
            }
            this.collection.reset(value);
        },
        dialogReady: function() {
            this._showCollection();
        },
        // fix the style issue caused by 'form-control'
        className: "",
        _showCollection: function() {
            if (this.collection.length == 0) {
                this.$el.hide();
            } else {
                this.$el.show();
            }
        },
        _initCollectionView: function() {
            if (!this.collectionView) {
                this.collectionView = new this.viewConstructor({
                    collection: this.collection
                });
            }
            this.collectionView.render();
        }
    });


    /*
     * FilesUpload used by Achievement module
     * FIXME needs an solution to handle this kind of customized code
     */
    Components.Form.editors.FilesUpload = Components.Form.editors.BaseUploader.extend({
        initialize: function(options) {
            Components.Form.editors.BaseUploader.prototype.initialize.apply(this, arguments);
            this._additionalInitialzer();
        },
        _additionalInitialzer: function() {
            // customize collection
            _.extend(this.collection, {
                pid: this.params['pid'],
                achievement_id: this.params['achievement_id'],
            });
            // load existing when pop-up
            if (_.isUndefined(this.schema.loadDocs) || this.schema.loadDocs) {
                this.collection.fetch({ reset: true });
            }
        },
        render: function(options) {
            // hack the base class to delay the render
            if ($(this.dropZone).length > 0) {
                Components.Form.editors.BaseUploader.prototype.render.apply(this, arguments);
            }
            return this;
        },
        dropZoneDragOver: "dropZoneDragOver",
        // to handle the dom not ready case
        dropZoneReady: function() {
            var self = this;
            $(this.dropZone).on("dragover.Uploader", function(e) {
                e.preventDefault();
                $(this).addClass(self.dropZoneDragOver);
            }).on("dragend.Uploader", function(e) {
                e.preventDefault();
                if (self.collection.length > 0) {
                    $(this).removeClass(self.dropZoneDragOver);
                }
            }).on("dragleave.Uploader", function(e) {
                e.preventDefault();
                if (self.collection.length > 0) {
                    $(this).removeClass(self.dropZoneDragOver);
                }
            }).on("drop.Uploader", function(e) {
                e.preventDefault();
                if (self.uploader.constructor.support.dropFiles) {
                    $(this).removeClass(self.dropZoneDragOver);
                    if (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files) {
                        self.uploader.addToList(e.originalEvent.dataTransfer.files);
                    }
                } else {
                    if (self.collection.length > 0) {
                        $(this).removeClass(self.dropZoneDragOver);
                    }
                    Spms.vent.trigger("message", "当前浏览器不支持文件拖拽方式上传");
                }
            });

            this.render();
        },
        _initAttachesView: function() {
            if (this.attachesView) return;
            this.attachesView = new this.viewsName({
                collection: this.collection
            });
            this.attachesView.render();
            // remove the model in different cases
            this.attachesView.on('childview:removeAttach', this.removeChildAttach);
            this.attachesView.on('childview:hide', this._showAttaches);
        },
        removeChildAttach: function(childview, args) {
            var self = this;
            var model = args.model;
            if (!model.isNew()) {
                // not delete directly, just set & hide
                model.set("del_flg", "1");
                childview.trigger("hide").$el.hide();
            } else {
                self.collection.remove(model);
            }
        },
        _showAttaches: function() {
            // toggled dropZoneDragOver to make it show or not
            if (this.collection.where({ "del_flg": "0" }).length == 0) {
                $(this.dropZone).addClass(this.dropZoneDragOver);
            } else {
                $(this.dropZone).removeClass(this.dropZoneDragOver);
            }
        },
        fileAdd: function(uniqueId, name, file) {
            var model = _.extend({
                    uploading: true,
                    uniqueId: uniqueId,
                    upload_time: Date.now() / 1000,
                    uploader: SPMS_GV.user,
                    del_flg: "0",
                    name: file.name || name,
                    size: file.size || null
                },
                _.pick(this.params, 'app_type', 'app_id', 'achievement_id', 'pid'), {
                    belong_unit: SPMS_GV.user.dept_ids
                }
            );
            this.collection.add(model);
            this.resetButtonState(false);
        },
        fileInvalid: function(name, message) {
            for (var i in message.errors) {
                Spms.vent.trigger("message", message.errors[i].message);
            }
            this.resetButtonState();
            return;
        },
        // fix the style issue caused by 'form-control'
        className: "",
        uploadError: function(uniqueId, name, message) {
            var model = this.collection.findWhere({ "uniqueId": uniqueId });
            Spms.vent.trigger("message", "网络传输异常，请联系管理员！");
            this.collection.remove(model);
            this.resetButtonState();
            return;
        },
        uploadComplete: function(uniqueId, name, resp, status, xhr) {
            var model = this.collection.findWhere({ "uniqueId": uniqueId });
            resp = JSON.parse(resp);
            if (status != null && status != 200) {
                Spms.vent.trigger("message", "系统异常，请联系管理员！");
                this.resetButtonState();
                return;
            }
            if (!_.isUndefined(resp.error)) {
                Spms.vent.trigger("message", resp.error + ":" + name);
                this.collection.remove(model);
                this.resetButtonState();
                return;
            }
            model.unset("uploading", { silent: true }).set({
                id: resp.id,
                ext_name: resp.ext_name,
                size: resp.file_size
            });
            this.resetButtonState();
        },
        // override to avoid commit flash
        setValue: function() {},
        resetButtonState: function(completed) {
            this.form.complete = !_.isUndefined(completed) ? completed : (this.collection.where({ uploading: true }).length > 0 ? false : true);
            this.form.setButtonState();
        },
    });



    /*
     * Used by TaskDocUpload
     **/
    Components.Form.editors.TaskFilesUpload = Components.Form.editors.FilesUpload.extend({
        _additionalInitialzer: function() {
            // customize collection
            _.extend(this.collection, {
                app_id: this.params['app_id'],
                app_type: this.params['app_type'],
                task_id: this.params['task_id'],
                pid: this.params['pid']
            });
            // load existing when pop-up
            if (_.isUndefined(this.schema.loadDocs) || this.schema.loadDocs) {
                this.collection.fetch({ reset: true });
            }
        },
        fileAdd: function(uniqueId, name, file) {
            var model = _.extend({
                    uploading: true,
                    uniqueId: uniqueId,
                    upload_time: Date.now() / 1000,
                    uploader: SPMS_GV.user,
                    del_flg: "0"
                },
                _.pick(this.params, 'app_type', 'app_id', 'task_id', 'pid'),
                _.pick(file, 'name', 'size'), {
                    belong_unit: SPMS_GV.user.dept_ids
                }
            );
            this.collection.add(model);
            this.form.complete = false;
            this.form.setButtonState();
        }
    });



    /**
     * TextAreaHelper 在TextArea基础上添加 @对象 #话题 表情功能，增加捕获键盘事件
     */
    Components.Form.editors.TextAreaHelper = Components.Form.editors.TextArea.extend({
        defaults: {
            autoheight: true, // 默认自适应高度
        },
        Collection: Backbone.Collection.extend({
            url: '',
            parse: function(datas) {
                return (datas['data']['data'])
            }
        }),
        initialize: function(options) {
            this.options = _.extend({}, this.defaults, options);
            this.constructor.__super__.initialize.call(this, options);
            this.collection = options.schema.collection || this.collection || new this.Collection;
            this._initAtWho();
            this.options.autoheight && this._initAutoHeight();
        },
        textChange: function() {},
        _initAtWho: function() {
            var emojis = $.map(Components.Dicts.emojis, function(value, i) {
                return { key: value, name: value }
            });
            var self = this;
            var at_config = {
                at: "@",
                callbacks: {
                    remote_filter: function(query, callback) {
                        // if(query.length !=0){
                        self.collection.fetch({
                            data: { s: query },
                            reset: true,
                            success: function(collection, resp) {
                                callback(resp['data']['data'])
                            }
                        });;
                        // }
                    },
                    sorter: function(query, items, search_key) {
                        return items
                    },
                    tpl_eval: function(tpl, map) {
                        tpl = '<li title=${name} data-value=${atwho-at}${name} data-id=${id} data-type=${type} data-name=${name}>${name}</li>'
                        var error;
                        try {
                            return tpl.replace(/\$\{([^\}]*)\}/g, function(tag, key, pos) {
                                return map[key];
                            });
                        } catch (_error) {
                            error = _error;
                            return "";
                        }
                    },
                    before_insert: function(value, $li) {
                        self.trigger('add_at_who', { id: $li.attr("data-id"), name: $li.attr("data-name"), type: $li.attr("data-type") })
                        return value;
                    }
                },
                limit: 8,
                start_with_space: false,
                startWithSpace: false
            };
            var emoji_config = {
                at: ":",
                data: emojis,
                tpl: "<li class='at' data-value='${atwho-at}${name}'><img src='http://assets.github.com/images/icons/emoji/${name}.png'  height='20' width='20' /></li>",
                insert_tpl: "<span id='${id}'>${atwho-data-value}</span>",
                limit: emojis.length
            }
            this._input_at = this.$el.atwho(at_config).atwho(emoji_config);
            var self = this;
            this._input_at.on('change', function() {
                // console.log(self);
            });
        },
        _initAutoHeight: function() {
            this.$el.autosize();
        },
        getValue: function() {
            return $.trim(this.$el.val());
        },
        setValue: function(value) {
            this.$el.val($.trim(value));
        },
        determineChange: function(event) {
            if (event && this.options.schema.commitHelper && event.keyCode == 13 && event.ctrlKey) {
                this.trigger('checkSumit', event);
            }
            this.trigger('change', this)
        }
    });

    Components.Form.editors.ShareObject = Components.Form.editors.TagsInput.extend({
        Collection: Backbone.Collection.extend({
            url: '/cmri/suggestion/share',
            parse: function(data) {
                return data['data']['data']
            }
        }),
        initialize: function(options) {
            _.extend(options);
            var url = !options['schema']['url'] ? Ehr_HOSTS + '/cmri/suggestion/share' : Ehr_HOSTS + options['schema']['url'];
            if (options['schema']['items']) this.defaults.items = options['schema']['items'];
            this.Collection = Backbone.Collection.extend({
                url: url,
                parse: function(data) {
                    return data['data']['data']
                }
            });
            Components.Form.editors.TagsInput.prototype.initialize.call(this, options);
        },
        tagClass: function(item) {
            var classes = item.id == 'public' ? 'label label-success' : 'label label-primary';
            if (item.locked) classes += ' disabled';
            return classes;
        },
        onRender: function() {
            this.constructor.__super__.onRender.apply(this, arguments);
            this.$el.on('beforeItemRemove', function(evt) {
                if (evt.item.locked) evt.cancel = true;
            })
        }
    });

    //部所
    Components.Form.editors.ShareDepts = Components.Form.editors.TagsInput.extend({
        defaults: {
            freeInput: true,
            itemValue: 'id',
            itemText: 'name',
            items: 100
        },
        Collection: Jma.Entities.ShareDepts,
        onRender: function() {
            var self = this;
            this.constructor.__super__.onRender.apply(this, arguments);
            this.$el.on('beforeItemRemove', function(evt) {
                if (evt.item.locked) evt.cancel = true;
            });
            $(this.$el).after('<button type="button" class="btn btn-default share-yjl-btn" aria-expanded="false">      <span class="caret"></span>      <span class="sr-only">Toggle Dropdown</span>      </button>');
            $(this.$el).parent().find('button').on('click', function() {
                self.$el.tagsinput()[0].$input.val(' ').focus();
                self.$el.tagsinput()[0].$input.trigger('keyup');
            });
        }
    });

    Components.Form.editors.ShareSpecail = Components.Form.editors.TagsInput.extend({
        Collection: Backbone.Collection.extend({
            url: '/spms/console/manager',
            parse: function(data) {
                var datas = [data['data']['list'][0]['member'], data['data']['list'][1]['member']]
                datas = _.flatten(datas);
                return datas
            }
        }),
        initialize: function(options) {
            _.extend(options);
            if (options['schema']['url']) {
                this.Collection.url = options['schema']['url']
            }
            Components.Form.editors.TagsInput.prototype.initialize.call(this, options);
        },
        tagClass: function(item) {
            var classes = item.id == 'public' ? 'label label-success' : 'label label-primary';
            if (item.locked) classes += ' disabled';
            return classes;
        },
        onRender: function() {
            this.constructor.__super__.onRender.apply(this, arguments);
            this.$el.on('beforeItemRemove', function(evt) {
                if (evt.item.locked) evt.cancel = true;
            })
        }
    });

    /**
     * 字典类型 Checkbox
     * Collection fetch数据包含有ID、name
     */
    Components.Form.editors.DictCheckboxes = Components.Form.editors.BootstrapCheckboxes.extend({
        _collectionToHtml: function(collection) {
            //Convert collection to array first
            var array = [];
            collection.each(function(model) {
                array.push({ val: model.id, label: model.get('name') });
            });

            //Now convert to HTML
            var html = this._arrayToHtml(array);

            return html;
        },
        getValue: function() {
            var self = this,
                item,
                values = [];
            this.$('input[type=checkbox]:checked').each(function() {
                item = _.findWhere(self._array, { val: $(this).val() });
                values.push({ id: item.val, name: item.label });
            });
            return values;
        },
        setValue: function(values) {
            if (_.isArray(values)) {
                values = _.pluck(values, 'id');
            } else if (!_.isArray(values)) values = [values];
            this.$('input[type=checkbox]').val(values);
        },
    });

    Components.Form.editors.InlineNestedModel = Components.Form.editors.Object.extend({
        initialize: function(options) {
            Components.Form.editors.Base.prototype.initialize.call(this, options);

            if (!this.form) throw new Error('Missing required option "form"');
            if (!options.schema.model) throw new Error('Missing required "schema.model" option for NestedModel editor');
        },
        render: function() {
            //Get the constructor for creating the nested form; i.e. he same constructor as used by the parent form
            var NestedForm = this.form.constructor;

            var data = this.value || {},
                key = this.key,
                nestedModel = this.schema.model;

            //Wrap the data in a model if it isn't already a model instance
            var modelInstance = (data.constructor === nestedModel) ? data : new nestedModel(data);

            this.nestedForm = new NestedForm({
                model: modelInstance,
                idPrefix: this.id + '_',
                fieldTemplate: 'nestedFieldInline',
                template: _.template('<div class="bbf-nested-form" data-fieldsets=""></div>')
            });

            this._observeFormEvents();

            //Render form
            this.$el.html(this.nestedForm.render().el);

            if (this.hasFocus) this.trigger('blur', this);

            return this;
        },

        /**
         * Update the embedded model, checking for nested validation errors and pass them up
         * Then update the main model if all OK
         *
         * @return {Error|null} Validation error or null
         */
        commit: function(options) {
            return Components.Form.prototype.commit.call(this.nestedForm);
        },
        validate: function() {
            return Components.Form.prototype.validate.call(this.nestedForm);
        }
    });

    // Components.Form.editors.ModelList = Components.Form.editors.List.extend({
    //  hasNestedForm : true,
    //  validate: function() {
    //  //Collect errors
    //  var itemValidate = function(item){
    //  var errors = _.extend({},
    //  Components.Form.editors.Base.prototype.validate.call(item),
    //  item.editor.validate()
    //  );
    //  return _.isEmpty(errors) ? false: errors;
    //  };
    //  var errors = _.map(this.items, function(item) {
    //  return itemValidate(item);
    //  });

    //  //Check if any item has errors
    //  var hasErrors = _.compact(errors).length ? true : false;
    //  if (!hasErrors) return null;

    //  //If so create a shared error
    //  var fieldError = {
    //  type: 'list',
    //  message: '列表中的一些元素未能通过校验',
    //  errors: errors
    //  };

    //  return fieldError;
    //  }
    //  });

    Components.Form.editors.Slider = Components.Form.editors.Base.extend({
        initialize: function(options) {
            // Call parent constructor
            Backbone.Form.editors.Base.prototype.initialize.call(this, options);
            // Custom setup code.
            if (!this.schema || !this.schema.sliderOptions) throw new Error("Missing required 'schema.sliderOptions'");
            this.initSlider();
        },
        initSlider: function() {
            var self = this;
            var sliderOptions = this.schema.sliderOptions;
            this.$sliderContainer = $("<div class='slider-container well'><input name='" + this.key + "'/></div>");
            this.$slider = this.$sliderContainer.find('input').slider(_.pick(sliderOptions, function(value, key, object) {
                return key in Slider.prototype.defaultOptions;
            })).on('slide', function() {}).on('change', function(e) {
                var changed = e.value;
                if (sliderOptions.max_value && changed.newValue > sliderOptions.max_value) {
                    self.setValue(changed.oldValue);
                    return;
                }
                if (sliderOptions.min_value && changed.newValue < sliderOptions.min_value) {
                    self.$slider.setValue(changed.oldValue);
                    return;
                }
            }).data('slider');
        },
        render: function() {
            this.$el.append(this.$sliderContainer);
            return this;
        },
        getValue: function() {
            return this.$slider.getValue();
        },
        setValue: function(value) {
            this.$slider.setValue(value);
        },
        focus: function() {
            if (this.hasFocus) return;
            this.$el.focus();
        },
        blur: function() {
            if (!this.hasFocus) return;
            this.$el.blur();
        }
    });

    Components.Form.editors.Files = Components.Form.editors.Base.extend({
        tagName: 'div',
        className: 'filesEditor-container',
        initialize: function(options) {
            _.bindAll(this, 'fileAdd', 'fileRemove', 'fileInvalid', 'tooManyFiles', 'beforeUpload',
                'uploadStart', 'uploadProgress', 'uploadComplete', 'uploadFail', 'uploadAbort',
                'initUploader', 'destroyUploader'
            );
            Components.Form.editors.Base.prototype.initialize.apply(this, arguments);
            this.files = new Backbone.Collection(this.model.get(this.key));
        },
        getValue: function() {
            return this.files.toJSON();
        },
        setValue: function(files) {
            if (!_(files).isArray()) {
                throw new Error("文件格式错误");
            }
            this.files.set(files);
        },
        validate: function(data) {
            var self = this;
            var err = {
                type: 'uploader',
                message: '文件正在上传，请稍后...'
            };
            if (this.uploader && _.filter(this.files.models, function(item) {
                    return item.get('uploading')
                }).length != 0) {
                new Juggler.Notify({ message: '文件正在上传，请稍后...' }, { delay: 1000 });
                setTimeout(function() {
                    self.clearError();
                }, 500);
                return err;
            }

            return Components.Form.editors.Base.prototype.validate.apply(this);
        },
        clearError: function() {
            var container = this.form.$el.find('.' + this.schema.fieldClass);
            container.find('[data-error]').empty();
            container.removeClass('has-error');
        },
        render: function() {
            if (!this.uploader) {
                this.beforeInitUploader();
                this.initUploader();
            }
            return this;
        },
        resetButtonState: function(completed) {
            this.form.complete = !_.isUndefined(completed) ? completed : (this.files.where({ uploading: true }).length > 0 ? false : true);
            this.form.setButtonState();
        },
        destroyUploader: function() {
            // destroy uploader instance to avoid the duplicate events trigger issue
            this.uploader.destroyAll();
        },
        beforeInitUploader: function() {
            // build Dom for uploader plugin
            var FilesView = this.schema.getFilesView();
            var button = '<span class=\"btn btn-default btn-file js-btn-uploader pull-left\">' + this.schema.title + '</span>';
            this.filesView = new FilesView({
                collection: this.files
            })
            this.$el.append(button);
            this.$selectButton = this.$el.find(".js-btn-uploader");
            this.$el.append(this.filesView.render().$el);
            this.$dropZone = this.filesView.$el;
        },
        initUploader: function() {
            var self = this;
            var defaults = {
                acceptSize: [null, 50 * 1024],
                errors: {
                    invalidType: "文件：{{fileName}}格式无效，只能上传如下后缀的文件: {{allowedExtensions}}",
                    sizeTooSmall: "文件：{{fileName}}太小了，请上传大于{{allowedMinSize}}的文件。",
                    sizeTooLarge: "文件：{{fileName}}太大了，请重新上传小于{{allowedMaxSize}}的文件。",
                    tooManyFiles: "无法上传文件：{{fileName}}，因为你一次只能上传{{maxFiles}}文件。",
                    networkError: "在上传文件：{{fileName}}过程中出现异常，请重新上传。"
                },
                headers: {
                    "Accept": "application/json, text/javascript, */*; q=0.01"
                },
                selectButton: this.$selectButton,
                dropZone: this.$dropZone,
                multiple: true
            };

            this.uploader = new Uploader(
                _.defaults(defaults, self.schema.uploaderOptions)
            );
            this.uploader
                .on("fileAdd", this.fileAdd)
                .on("fileRemove", this.fileRemove)
                .on("fileInvalid", this.fileInvalid)
                .on("tooManyFile", this.tooManyFiles)
                .on("beforeUpload", this.beforeUpload)
                .on("uploadStart", this.uploadStart)
                .on("uploadProgress", this.uploadProgress)
                .on("uploadComplete", this.uploadComplete)
                .on("uploadFail", this.uploadFail)
                .on("uploadAbort", this.uploadAbort);
        },
        fileAdd: function(uniqueId, name, file) {
            var model = {
                uploading: true,
                uniqueId: uniqueId,
                upload_time: Date.now() / 1000,
                del_flg: "0",
                name: file.name || name,
                size: file.size || null
            };
            this.files.add(model);
            this.resetButtonState(false);
        },
        fileRemove: function(uniqueId, name) {

        },
        fileInvalid: function(name, error) {
            this.resetButtonState();
        },
        tooManyFiles: function(name, message) {

        },
        beforeUpload: function(uniqueId, name, data, xhr) {
            console.log("beforeUpload");
        },
        uploadStart: function(uniqueId, name) {
            console.log("uploadStart");
        },
        uploadProgress: function(uniqueId, name, loaded, total) {
            console.log("uploadProgress");
        },
        uploadComplete: function(uniqueId, name, response, status, xhr) {
            var model = this.files.findWhere({ "uniqueId": uniqueId });
            response = JSON.parse(response);
            if (status != null && status != 200) {
                Spms.vent.trigger("message", "系统异常，请联系管理员！");
                this.resetButtonState();
                return;
            }
            if (!_.isUndefined(response.error)) {
                Spms.vent.trigger("message", response.error + ":" + name);
                this.files.remove(model);
                this.resetButtonState();
                return;
            }
            model.unset("uploading", { silent: true }).set({
                id: response.id,
            });
            this.trigger('change', this);
            this.resetButtonState();
        },
        uploadFail: function(uniqueId, name, message) {

        },
        uploadAbort: function(uniqueId, name) {

        }
    });

    // datalist start
    Components.Pills = Jma.Views.List.extend({
        className: 'nav nav-pills'
    });

    Components.FilterItem = Jma.Views.Item.extend({
        onClick: function(e) {
            var params = $.param(this.model.toJSON());
            Backbone.history.navigate(params);
            e.preventDefault();
        }
    });

    Components.Filter = Components.Pills.extend({
        childView: Components.FilterItem,
        emptyView: Jma.Views.ItemView
    });

    Components.GroupItem = Jma.Views.Item.extend({
        className: 'list-group-item'
    });

    Components.ListGroup = Jma.Views.List.extend({
        className: 'list-group',
        childView: Components.GroupItem
    });

    Components.Pagination = Jma.Views.List.extend({
        className: 'pagination pull-right',
        defaults: {
            first: '&laquo;',
            prev: '&lsaquo;',
            next: '&rsaquo;',
            last: '&raquo;',
            totalPages: 100,
            startPage: 1,
            visiblePages: 10
        },
        events: {
            'click .disabled a': 'stop'
        },
        initialize: function(options) {
            var self = this,
                collection = this.collection;
            this.defaults.onPageClick = function(event, page) {
                collection.getPage(page);
            };
            this.options = _.extend(this.defaults, options);
            this.collection.unbind('reset').on('reset', this.pageable, this);
            this.options.model.on('change', function() {
                self.queryParams();
                self.collection.fetch({ reset: true });
            });
            if (this.collection.state && this.collection.state.totalPages) this.pageable();
        },
        render: function() {
            return this;
        },
        pageable: function() {
            this.options.totalPages = this.collection.state.totalPages || 1;
            this.options.startPage = this.collection.state.currentPage;
            this.options.totalRecords = this.collection.state.totalRecords;
            this.onDestroy();
            if (this.options.totalPages > 1) {
                this.$el.twbsPagination(this.options);
            }
        },
        queryParams: function() {
            this.collection.queryParams = _.extend(this.collection.queryParams, this.options.model.toJSON());
        },
        onDestroy: function() {
            if (this.$el.data('twbs-pagination'))
                this.$el.twbsPagination('destroy');
        },
        stop: function(event) {
            event.stopPropagation();
            event.preventDefault()
            return false
        }
    });
    Components.DataList = Jma.Views.Layout.extend({
        className: 'data-list',
        template: Jma.Templates.datalist,
        FilterView: Components.Filter,
        ListView: Components.ListGroup,
        PaginationView: Components.Pagination,
        initialize: function(options) {
            var collection = new Jma.Entities.Collection(options.filter || []);
            this.filter = new this.FilterView({ collection: collection });
            this.list = new this.ListView({ collection: this.collection });
            this.pagination = new this.PaginationView({ collection: this.collection, model: options.filterModel || new Jma.Entities.Model() });
        },
        onShow: function() {
            this.filterRegion.show(this.filter);
            this.listContentRegion.show(this.list);
            this.paginationRegion.show(this.pagination)
        }
    });
    // datalist end

    Components.Form.editors.DatePickerCheck = Components.Form.editors.Text.extend({
        render: function() {
            // Call the parent's render method
            var self = this;
            Backbone.Form.editors.Text.prototype.render.call(this);
            // Then make the editor's element a datepicker.
            this.$el.datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                weekStart: 1,

            }).on('changeDate', function(ev) {
                // console.log()
                var value = ev.date.valueOf() / 1000;
                self.model.set(self.key, value);

            });
            return this;
        },
        // The set value must correctl
        setValue: function(value) {
            var date = new Date();
            value = value || date;
            this.$el.val(moment(value).format('YYYY-MM-DD'));
        }
    });
    // switch组件
    Components.Form.editors.OpenBar = Components.Form.editors.Base.extend({
            className: 'togger',
            render: function() {
                var self = this;
                console.log(this.schema);
                this.checkbox = $('<input type="checkbox" class="togger-btn" id="togger-' + this.key + '"/>')
                this.$container = $('<label for="togger-' + this.key + '"><i></i></label>')
                self.$el.append(this.checkbox).append(self.$container);
                setTimeout(function() {
                    console.log(self.model.get(self.key))
                    if (self.model.get(self.key)) {
                        self.checkbox.attr({ checked: 'checked' })
                    }
                    self._init_bindEvent();
                }, 0)
            },
            _init_bindEvent: function() {
                var self = this;
                self.$container.click(function() {
                    var data = 0;
                    if (self.checkbox[0].checked) data = 1;
                    self.value = data;
                })
            },
            getValue: function() {
                return this.value;
            },
            setValue: function(value) {
                this.value = value;
                if (value) {
                    this.checkbox.attr({ checked: true });
                } else {
                    this.checkbox.removeAttr({ checked: true })
                }
            },
        })
    Components.Form.editors.Toggle = Components.Form.editors.OpenBar
        // 选择用户组件
    Components.Form.editors.selectUser_commectionModel = Backbone.Model.extend({
        urlRoot: 'api/member'

    });
    Components.Form.editors.selectUser_commection = Backbone.Collection.extend({
        url: 'api/member',
        model: Components.Form.editors.selectUser_commectionModel,
        parse: function(resp) {
            return resp['data'];
        }
    })

    Components.Form.editors.selectUser_view = Backbone.View.extend({
        className: 'list-item',
        initialize: function() {},
        render: function() {
            this.$el.html('<div class="list-item-w">\
                        <label>' + this.model.get("name") + '</label>\
                        <div class="checkbox-w">\
                          <input type="checkbox" id="' + this.model.get("id") + '-checkbox-1" name="radio-1"/>\
                          <label for="' + this.model.get("id") + '-checkbox-1"></label>\
                         </div>\
                      </div>');
            this._init_bind()
            return this;
        },
        _init_bind: function() {
            var self = this;
            this.checkbox = this.$el.find('input');
            this.checkbox.bind('change', function(evt) {
                var target = $(evt.currentTarget);
                var data = 0;
                if (target[0]['checked']) {
                    data = 1;
                }
                console.log(data)
                self.model.set({ checked: data })
            })
        }
    })
    Components.Form.editors.selectUser = Components.Form.editors.Base.extend({
        className: 'select-user',
        initialize: function() {
            _.bindAll(this, 'addOne', 'addAll')
            this.collection = new Components.Form.editors.selectUser_commection()
            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);
        },
        addOne: function(model) {
            var view = new Components.Form.editors.selectUser_view({ model: model });
            this.container.append(view.render().el)
        },
        addAll: function() {
            this.container.html('');
            this.collection.each(this.addOne);
        },
        render: function() {
            var self = this;
            this.$container = $('<div class="select-user-w">\
                                  <div class="select-user-add">\
                                    <div class="select-user-add-ico">\
                                     <i class="fa fa-chevron-right" aria-hidden="true"></i>\
                                    </div>\
                                    <div class="select-user-add-val">选择考勤人员</div>\
                                  </div>\
                                  <div class="select-user-c"></div>\
                                 \
                                </div>')

            this._init_bindEvent();
            setTimeout(function() {
                self.$el.append(self.$container);
            }, 0)
        },
        _init_bindEvent: function() {
            var self = this;
            this.$container.delegate('.select-user-add', 'click', function() {
                var clientW = document.documentElement.clientWidth || document.documentElement.clientWidth;
                var clientH = document.documentElement.clientHeight || document.documentElement.clientHeight;
                var UserList = $('<div class="select-user-list">\
                              <div class="bar bar-header">\
                               <div class="bar-w">\
                                <button type="button" class="btn back">返回</button>\
                                <button type="button" class="btn right save">保存</button>\
                                <h1 class="ellipsis">选择考勤人员</h1>\
                               </div>\
                              </div>\
                               <div class="select-user-list-w list">\
                                \
                              </div>\
                              <div class="select-user-list-c list">\
                                <div class="list-w"></div>\
                              </div>\
                              <div class="select-user-select hide"></div>\
                            </div>')
                UserList.css({ left: clientW + 'px', width: clientW + 'px' })
                $('body').append(UserList);
                UserList.stop().animate({ left: 0 });
                UserList.delegate('.back', 'click', function() {
                    this.trigger('save');
                    UserList.remove();
                })
                UserList.delegate('.save', 'click', function() {
                    UserList.remove();
                })
                self.container = UserList.find('.list-w');
                self.collection.fetch();
                self.collection.reset([{ id: '1111', name: '111', checked: false }, { id: '222', name: '222', checked: false }, { id: '3333', name: '333', checked: false }, ])

            })
        }
    })

    //选择班制组件
    Components.Form.editors.selectWorkSystem_view = Backbone.View.extend({
        className: 'list-item',
        initialize: function() {},
        render: function() {

            this.$el.html('<div class="list-item-w">\
                        <label>' + this.model.get("name") + '</label>\
                        <div class="radio-w">\
                          <input type="radio" id="' + this.model.get("id") + '-radio-1" name="radio-1"/>\
                          <label for="' + this.model.get("id") + '-radio-1"></label>\
                         </div>\
                      </div>');
            this._init_bind()
            return this;
        },
        _init_bind: function() {
            var self = this;
            this.checkbox = this.$el.find('input');
            this.checkbox.bind('change', function(evt) {
                var target = $(evt.currentTarget);
                var data = 0;
                if (target[0]['checked']) {
                    data = 1;
                }
                self.model.set({ checked: data })
            })
        }
    })
    Components.Form.editors.selectWorkSystem_commection = Backbone.Collection.extend({})
    Components.Form.editors.selectWorkSystem = Components.Form.editors.Base.extend({
        className: 'select-work',
        initialize: function() {
            _.bindAll(this, 'addOne', 'addAll')
            this.collection = new Components.Form.editors.selectWorkSystem_commection();
            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);
        },
        addOne: function(model) {
            var view = new Components.Form.editors.selectWorkSystem_view({ model: model });
            this.container.append(view.render().el)
        },
        addAll: function() {
            this.container.html('');
            this.collection.each(this.addOne);
        },
        render: function() {
            var self = this;
            this.$container = $('<div class="select-w">\
                              <div class="select-worksystem-list">\
                              </div>\
                              <div class="select-user-c"></div>\
                            </div>')
            self.container = this.$container.find('.select-worksystem-list');
            self.collection.reset([{ id: '1111', name: '自由班制', checked: false }, { id: '222', name: '固定班制', checked: false }, { id: '3333', name: '流水班制', checked: false }, ])

            this._init_bindEvent();
            setTimeout(function() {
                self.$el.append(self.$container);
            }, 0)
        },
        _init_bindEvent: function() {
            var self = this;
        }
    })


    Components.Form.editors.Date = Components.Form.editors.Base.extend({
        className: 'Form-date',
        render: function() {
            this.$el.html('<div class="Form-date-w">\
                        <input type="date"/>\
                       </div>')
            this._init_bindEvent();
        },
        _init_bindEvent: function() {
            var self = this;
            this.input = this.$el.find('input');
            var data = this.formateData(Date.parse(new Date()) / 1000);
            this.input.val(data);
            this.input.on('change', function() {
                self.model.set(self.key, self.getValue());
            })
        },
        formateData: function(time) {
            var date = new Date(time * 1000);
            var yyyy = date.getFullYear();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
            return (yyyy + "-" + (mm < 10 ? '0' + mm : mm) + "-" + (dd < 10 ? '0' + dd : dd))
        },
        getValue: function() {
            var data = Date.parse(new Date(this.input)) / 1000;
            return data
        },
        setValue: function(value) {
            var data = this.formateData(Date.parse(new Date(value)) / 1000);
            this.input.val(data);
        }
    })
    Components.Form.editors.calendarPicker = Components.Form.editors.Base.extend({
        className: 'Form-date',
        render: function() {
            this.$el.html('<div class="Form-date-w">\
                             <div class="date-select">\
                                  <input  value="" class="" readonly="readonly" name="appDate" id="appDate" type="text">\
                                  <i class="fa fa-chevron-down" aria-hidden="true"></i>\
                             </div>\
                           </div>')
            this._init_bindEvent();
        },
        _init_bindEvent: function() {
            var self = this;
            this.input = this.$el.find('input');
            this.dateSelect = this.$el.find('.date-select');
            var data = this.formateData(Date.parse(new Date()) / 1000);
            this.input.val(data);
            this.input.on('change', function() {
                self.model.set(self.key, self.getValue());
            })
            this.dateSelect.on('click', function() {
                console.log(123);
                var currYear = (new Date()).getFullYear();
                var opt = {};
                opt.date = {
                    preset: 'date'
                };
                opt.default = {
                    theme: 'android-ics light', //皮肤样式
                    display: 'modal', //显示方式 
                    mode: 'scroller', //日期选择模式
                    dateFormat: 'yyyy-mm-dd',
                    lang: 'zh',
                    showNow: true,
                    nowText: "今天",
                    startYear: currYear - 10, //开始年份
                    endYear: currYear + 10 //结束年份
                };

                $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
            })
        },
        formateData: function(time) {
            var date = new Date(time * 1000);
            var yyyy = date.getFullYear();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
            return (yyyy + "-" + (mm < 10 ? '0' + mm : mm) + "-" + (dd < 10 ? '0' + dd : dd))
        },
        getValue: function() {
            var data = Date.parse(new Date(this.input)) / 1000;
            return data
        },
        setValue: function(value) {
            var data = this.formateData(Date.parse(new Date(value)) / 1000);
            this.input.val(data);
        }
    });

    Components.Form.editors.FormSelect = Components.Form.editors.Base.extend({
            className: 'form-select',
            render: function() {
                console.log(this)
                    // <option value ="volvo">Volvo</option>\
                var html = _.map(this.schema.list, function(i) {
                    return '<option value="' + i["key"] + '">' + i["val"] + '</option>'
                }).join('')
                this.$el.html('<select class="form-select-w">' + html + '</select>')
                this._init_bindEvent();
            },
            _init_bindEvent: function() {
                this.select = this.$el.delegate('.form-select-w');
                // this.select.val(this.model.get(this.key) || this.schema.list[0]['key']);

                // $("#sel  option[value='s2'] ").attr("selected",true)
                // console.log(this.model.get(this.key))
                this.select.find('option[value=' + (this.model.get(this.key) || this.schema.list[0]['key']) + ']').attr("selected", true)

                this.select.on('change', function(evt) {
                    self.trigger('change')
                })
            },
            getValue: function() {
                return this.select.val()
            },
            setValue: function(value) {
                this.select.val(value)
            }
        })
        // checkbox组件
    Components.Form.editors.iCheckBoxCollection = Backbone.Collection.extend({})
    Components.Form.editors.iCheckBox_itemview = Backbone.View.extend({
        className: 'list-item',
        initialize: function() {},
        render: function() {
            this.$el.html('<div class="list-item-w">\
                        <label>' + this.model.get("name") + '</label>\
                        <div class="checkbox-w">\
                          <input type="checkbox" id="' + this.model.get("id") + '-checkbox-1" name="radio-1"/>\
                          <label for="' + this.model.get("id") + '-checkbox-1"></label>\
                         </div>\
                      </div>');
            this._init_bind()
            return this;
        },
        _init_bind: function() {
            var self = this;
            this.checkbox = this.$el.find('input');
            this.checkbox.bind('change', function(evt) {
                var target = $(evt.currentTarget);
                var data = 0;
                if (target[0]['checked']) {
                    data = 1;
                }
                console.log(data)
                self.model.set({ checked: data })
            })
        }
    })
    Components.Form.editors.iCheckBox = Components.Form.editors.Base.extend({
        className: 'list-w',
        initialize: function() {
            _.bindAll(this, 'addOne', 'addAll')
            this.collection = new Components.Form.editors.iCheckBoxCollection
            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);
        },
        addOne: function(model) {
            var view = new Components.Form.editors.selectUser_view({ model: model });
            this.container.append(view.render().el)
        },
        addAll: function() {
            this.container.html('');
            this.collection.each(this.addOne);
        },
        render: function() {
            var self = this;
            this.$container = $('<div class="select-list">\
                                  <div class="select-list-w"></div>\
                                </div>')
            self.container = this.$container.find('.select-list-w');
            self.collection.reset([{ id: '1111', name: '游泳', checked: false }, { id: '222', name: '摄影', checked: false }, { id: '333', name: '旅游', checked: false }, { id: '444', name: '电影', checked: false }])
                // self.collection.fetch();
            this._init_bindEvent();
            setTimeout(function() {
                self.$el.append(self.$container);
            }, 0)
        },
        _init_bindEvent: function() {
            var self = this;

        }
    })

    // radio组件
    Components.Form.editors.iRadio_view = Backbone.View.extend({
        className: 'list-item',
        initialize: function() {},
        render: function() {

            this.$el.html('<div class="list-item-w">\
                        <label>' + this.model.get("name") + '</label>\
                        <div class="radio-w">\
                          <input type="radio" id="' + this.model.get("id") + '-radio-1" name="radio-1"/>\
                          <label for="' + this.model.get("id") + '-radio-1"></label>\
                         </div>\
                      </div>');
            this._init_bind()
            return this;
        },
        _init_bind: function() {
            var self = this;
            this.checkbox = this.$el.find('input');
            this.checkbox.bind('change', function(evt) {
                var target = $(evt.currentTarget);
                var data = 0;
                if (target[0]['checked']) {
                    data = 1;
                }
                console.log(data)
                self.model.set({ checked: data })
            })
        }
    })
    Components.Form.editors.iRadioCollection = Backbone.Collection.extend({})
    Components.Form.editors.iRadio = Components.Form.editors.Base.extend({
        className: 'list-w',
        initialize: function() {
            _.bindAll(this, 'addOne', 'addAll')
            this.collection = new Components.Form.editors.iRadioCollection();
            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);
        },
        addOne: function(model) {
            var view = new Components.Form.editors.selectWorkSystem_view({ model: model });
            this.container.append(view.render().el)
        },
        addAll: function() {
            this.container.html('');
            this.collection.each(this.addOne);
        },
        render: function() {
            var self = this;
            this.$container = $('<div class="select-list">\
                                  <div class="select-list-w"></div>\
                                </div>')
            self.container = this.$container.find('.select-list-w');

            self.collection.reset([{ id: '1111', name: '111', checked: false }, { id: '222', name: '222', checked: false }, { id: '3333', name: '333', checked: false }, ])
                //self.collection.fetch(); 
            this._init_bindEvent();
            setTimeout(function() {
                self.$el.append(self.$container);
            }, 0)
        },
        _init_bindEvent: function() {
            var self = this;
        }
    })


});

/******************************************************************
 *
 * 全局字典
 * creator： yjl
 * date: 2016-03-31
 *
 *******************************************************************/
Jma.module('Dicts', function(Dicts, Jma, Backbone, Marionette, $, _) {

});

/******************************************************************
 *
 * 全局数据实体
 * creator： yjl
 * date: 2016-03-31
 *
 *******************************************************************/
Jma.module('Entities', function(Entities, Jma, Backbone, Marionette, $, _){

   
})

/* =========================================================
 * bootstrap-datepicker.js
 * Repo: https://github.com/eternicode/bootstrap-datepicker/
 * Demo: http://eternicode.github.io/bootstrap-datepicker/
 * Docs: http://bootstrap-datepicker.readthedocs.org/
 * Forked from http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function($, undefined){

  var $window = $(window);

  function UTCDate(){
    return new Date(Date.UTC.apply(Date, arguments));
  }
  function UTCToday(){
    var today = new Date();
    return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
  }
  function alias(method){
    return function(){
      return this[method].apply(this, arguments);
    };
  }

  var DateArray = (function(){
    var extras = {
      get: function(i){
        return this.slice(i)[0];
      },
      contains: function(d){
        // Array.indexOf is not cross-browser;
        // $.inArray doesn't work with Dates
        var val = d && d.valueOf();
        for (var i=0, l=this.length; i < l; i++)
          if (this[i].valueOf() === val)
            return i;
        return -1;
      },
      remove: function(i){
        this.splice(i,1);
      },
      replace: function(new_array){
        if (!new_array)
          return;
        if (!$.isArray(new_array))
          new_array = [new_array];
        this.clear();
        this.push.apply(this, new_array);
      },
      clear: function(){
        this.length = 0;
      },
      copy: function(){
        var a = new DateArray();
        a.replace(this);
        return a;
      }
    };

    return function(){
      var a = [];
      a.push.apply(a, arguments);
      $.extend(a, extras);
      return a;
    };
  })();


  // Picker object

  var Datepicker = function(element, options){
    this.dates = new DateArray();
    this.viewDate = UTCToday();
    this.focusDate = null;

    this._process_options(options);

    this.element = $(element);
    this.isInline = false;
    this.isInput = this.element.is('input');
    this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
    this.hasInput = this.component && this.element.find('input').length;
    if (this.component && this.component.length === 0)
      this.component = false;

    this.picker = $(DPGlobal.template);
    this._buildEvents();
    this._attachEvents();

    if (this.isInline){
      this.picker.addClass('datepicker-inline').appendTo(this.element);
    }
    else {
      this.picker.addClass('datepicker-dropdown dropdown-menu');
    }

    if (this.o.rtl){
      this.picker.addClass('datepicker-rtl');
    }

    this.viewMode = this.o.startView;

    if (this.o.calendarWeeks)
      this.picker.find('tfoot th.today, tfoot th.clear')
            .attr('colspan', function(i, val){
              return parseInt(val) + 1;
            });

    this._allow_update = false;

    this.setStartDate(this._o.startDate);
    this.setEndDate(this._o.endDate);
    this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

    this.fillDow();
    this.fillMonths();

    this._allow_update = true;

    this.update();
    this.showMode();

    if (this.isInline){
      this.show();
    }
  };

  Datepicker.prototype = {
    constructor: Datepicker,

    _process_options: function(opts){
      // Store raw options for reference
      this._o = $.extend({}, this._o, opts);
      // Processed options
      var o = this.o = $.extend({}, this._o);

      // Check if "de-DE" style date is available, if not language should
      // fallback to 2 letter code eg "de"
      var lang = o.language;
      if (!dates[lang]){
        lang = lang.split('-')[0];
        if (!dates[lang])
          lang = defaults.language;
      }
      o.language = lang;

      switch (o.startView){
        case 2:
        case 'decade':
          o.startView = 2;
          break;
        case 1:
        case 'year':
          o.startView = 1;
          break;
        default:
          o.startView = 0;
      }

      switch (o.minViewMode){
        case 1:
        case 'months':
          o.minViewMode = 1;
          break;
        case 2:
        case 'years':
          o.minViewMode = 2;
          break;
        default:
          o.minViewMode = 0;
      }

      o.startView = Math.max(o.startView, o.minViewMode);

      // true, false, or Number > 0
      if (o.multidate !== true){
        o.multidate = Number(o.multidate) || false;
        if (o.multidate !== false)
          o.multidate = Math.max(0, o.multidate);
        else
          o.multidate = 1;
      }
      o.multidateSeparator = String(o.multidateSeparator);

      o.weekStart %= 7;
      o.weekEnd = ((o.weekStart + 6) % 7);

      var format = DPGlobal.parseFormat(o.format);
      if (o.startDate !== -Infinity){
        if (!!o.startDate){
          if (o.startDate instanceof Date)
            o.startDate = this._local_to_utc(this._zero_time(o.startDate));
          else
            o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
        }
        else {
          o.startDate = -Infinity;
        }
      }
      if (o.endDate !== Infinity){
        if (!!o.endDate){
          if (o.endDate instanceof Date)
            o.endDate = this._local_to_utc(this._zero_time(o.endDate));
          else
            o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
        }
        else {
          o.endDate = Infinity;
        }
      }

      o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
      if (!$.isArray(o.daysOfWeekDisabled))
        o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
      o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
        return parseInt(d, 10);
      });

      var plc = String(o.orientation).toLowerCase().split(/\s+/g),
        _plc = o.orientation.toLowerCase();
      plc = $.grep(plc, function(word){
        return (/^auto|left|right|top|bottom$/).test(word);
      });
      o.orientation = {x: 'auto', y: 'auto'};
      if (!_plc || _plc === 'auto')
        ; // no action
      else if (plc.length === 1){
        switch (plc[0]){
          case 'top':
          case 'bottom':
            o.orientation.y = plc[0];
            break;
          case 'left':
          case 'right':
            o.orientation.x = plc[0];
            break;
        }
      }
      else {
        _plc = $.grep(plc, function(word){
          return (/^left|right$/).test(word);
        });
        o.orientation.x = _plc[0] || 'auto';

        _plc = $.grep(plc, function(word){
          return (/^top|bottom$/).test(word);
        });
        o.orientation.y = _plc[0] || 'auto';
      }
    },
    _events: [],
    _secondaryEvents: [],
    _applyEvents: function(evs){
      for (var i=0, el, ch, ev; i < evs.length; i++){
        el = evs[i][0];
        if (evs[i].length === 2){
          ch = undefined;
          ev = evs[i][1];
        }
        else if (evs[i].length === 3){
          ch = evs[i][1];
          ev = evs[i][2];
        }
        el.on(ev, ch);
      }
    },
    _unapplyEvents: function(evs){
      for (var i=0, el, ev, ch; i < evs.length; i++){
        el = evs[i][0];
        if (evs[i].length === 2){
          ch = undefined;
          ev = evs[i][1];
        }
        else if (evs[i].length === 3){
          ch = evs[i][1];
          ev = evs[i][2];
        }
        el.off(ev, ch);
      }
    },
    _buildEvents: function(){
      if (this.isInput){ // single input
        this._events = [
          [this.element, {
            focus: $.proxy(this.show, this),
            keyup: $.proxy(function(e){
              if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
                this.update();
            }, this),
            keydown: $.proxy(this.keydown, this)
          }]
        ];
      }
      else if (this.component && this.hasInput){ // component: input + button
        this._events = [
          // For components that are not readonly, allow keyboard nav
          [this.element.find('input'), {
            focus: $.proxy(this.show, this),
            keyup: $.proxy(function(e){
              if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
                this.update();
            }, this),
            keydown: $.proxy(this.keydown, this)
          }],
          [this.component, {
            click: $.proxy(this.show, this)
          }]
        ];
      }
      else if (this.element.is('div')){  // inline datepicker
        this.isInline = true;
      }
      else {
        this._events = [
          [this.element, {
            click: $.proxy(this.show, this)
          }]
        ];
      }
      this._events.push(
        // Component: listen for blur on element descendants
        [this.element, '*', {
          blur: $.proxy(function(e){
            this._focused_from = e.target;
          }, this)
        }],
        // Input: listen for blur on element
        [this.element, {
          blur: $.proxy(function(e){
            this._focused_from = e.target;
          }, this)
        }]
      );

      this._secondaryEvents = [
        [this.picker, {
          click: $.proxy(this.click, this)
        }],
        [$(window), {
          resize: $.proxy(this.place, this)
        }],
        [$(document), {
          'mousedown touchstart': $.proxy(function(e){
            // Clicked outside the datepicker, hide it
            if (!(
              this.element.is(e.target) ||
              this.element.find(e.target).length ||
              this.picker.is(e.target) ||
              this.picker.find(e.target).length
            )){
              this.hide();
            }
          }, this)
        }]
      ];
    },
    _attachEvents: function(){
      this._detachEvents();
      this._applyEvents(this._events);
    },
    _detachEvents: function(){
      this._unapplyEvents(this._events);
    },
    _attachSecondaryEvents: function(){
      this._detachSecondaryEvents();
      this._applyEvents(this._secondaryEvents);
    },
    _detachSecondaryEvents: function(){
      this._unapplyEvents(this._secondaryEvents);
    },
    _trigger: function(event, altdate){
      var date = altdate || this.dates.get(-1),
        local_date = this._utc_to_local(date);

      this.element.trigger({
        type: event,
        date: local_date,
        dates: $.map(this.dates, this._utc_to_local),
        format: $.proxy(function(ix, format){
          if (arguments.length === 0){
            ix = this.dates.length - 1;
            format = this.o.format;
          }
          else if (typeof ix === 'string'){
            format = ix;
            ix = this.dates.length - 1;
          }
          format = format || this.o.format;
          var date = this.dates.get(ix);
          return DPGlobal.formatDate(date, format, this.o.language);
        }, this)
      });
    },

    show: function(){
      if (!this.isInline)
        this.picker.appendTo('body');
      this.picker.show();
      this.place();
      this._attachSecondaryEvents();
      this._trigger('show');
    },

    hide: function(){
      if (this.isInline)
        return;
      if (!this.picker.is(':visible'))
        return;
      this.focusDate = null;
      this.picker.hide().detach();
      this._detachSecondaryEvents();
      this.viewMode = this.o.startView;
      this.showMode();

      if (
        this.o.forceParse &&
        (
          this.isInput && this.element.val() ||
          this.hasInput && this.element.find('input').val()
        )
      )
      this.setValue();
      // this._trigger('blur');
      this._trigger('hide');
    },

    remove: function(){
      this.hide();
      this._detachEvents();
      this._detachSecondaryEvents();
      this.picker.remove();
      delete this.element.data().datepicker;
      if (!this.isInput){
        delete this.element.data().date;
      }
    },

    _utc_to_local: function(utc){
      return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
    },
    _local_to_utc: function(local){
      return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
    },
    _zero_time: function(local){
      return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
    },
    _zero_utc_time: function(utc){
      return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
    },

    getDates: function(){
      return $.map(this.dates, this._utc_to_local);
    },

    getUTCDates: function(){
      return $.map(this.dates, function(d){
        return new Date(d);
      });
    },

    getDate: function(){
      return this._utc_to_local(this.getUTCDate());
    },

    getUTCDate: function(){
      return new Date(this.dates.get(-1));
    },

    setDates: function(){
      var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
      this.update.apply(this, args);
      this._trigger('changeDate');
      this.setValue();
    },

    setUTCDates: function(){
      var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
      this.update.apply(this, $.map(args, this._utc_to_local));
      this._trigger('changeDate');
      this.setValue();
    },

    setDate: alias('setDates'),
    setUTCDate: alias('setUTCDates'),

    setValue: function(){
      var formatted = this.getFormattedDate();
      if (!this.isInput){
        if (this.component){
          this.element.find('input').val(formatted).change();
        }
      }
      else {
        // marlin
        var lang = this.o.language;
        if(DPGlobal.formatDate(this.dates[0], 'yyyy', lang) == DPGlobal.formatDate(new Date(1970, 1, 1, 0, 0, 0), 'yyyy', lang))
          formatted = '';
        this.element.val(formatted).change();
      }
    },

    getFormattedDate: function(format){
      if (format === undefined)
        format = this.o.format;

      var lang = this.o.language;
      return $.map(this.dates, function(d){
        return DPGlobal.formatDate(d, format, lang);
      }).join(this.o.multidateSeparator);
    },

    setStartDate: function(startDate){
      this._process_options({startDate: startDate});
      this.update();
      this.updateNavArrows();
    },

    setEndDate: function(endDate){
      this._process_options({endDate: endDate});
      this.update();
      this.updateNavArrows();
    },

    setDaysOfWeekDisabled: function(daysOfWeekDisabled){
      this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
      this.update();
      this.updateNavArrows();
    },

    place: function(){
      if (this.isInline)
        return;
      var calendarWidth = this.picker.outerWidth(),
        calendarHeight = this.picker.outerHeight(),
        visualPadding = 10,
        windowWidth = $window.width(),
        windowHeight = $window.height(),
        scrollTop = $window.scrollTop();

      var parentsZindex = [];
      this.element.parents().each(function() {
        var itemZIndex = $(this).css('z-index');
        if ( itemZIndex !== 'auto' && itemZIndex !== 0 ) parentsZindex.push( parseInt( itemZIndex ) );
      });
      var zIndex = Math.max.apply( Math, parentsZindex ) + 10;
      var offset = this.component ? this.component.parent().offset() : this.element.offset();
      var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
      var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
      var left = offset.left,
        top = offset.top;

      this.picker.removeClass(
        'datepicker-orient-top datepicker-orient-bottom '+
        'datepicker-orient-right datepicker-orient-left'
      );

      if (this.o.orientation.x !== 'auto'){
        this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
        if (this.o.orientation.x === 'right')
          left -= calendarWidth - width;
      }
      // auto x orientation is best-placement: if it crosses a window
      // edge, fudge it sideways
      else {
        // Default to left
        this.picker.addClass('datepicker-orient-left');
        if (offset.left < 0)
          left -= offset.left - visualPadding;
        else if (offset.left + calendarWidth > windowWidth)
          left = windowWidth - calendarWidth - visualPadding;
      }

      // auto y orientation is best-situation: top or bottom, no fudging,
      // decision based on which shows more of the calendar
      var yorient = this.o.orientation.y,
        top_overflow, bottom_overflow;
      if (yorient === 'auto'){
        top_overflow = -scrollTop + offset.top - calendarHeight;
        bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
        if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
          yorient = 'top';
        else
          yorient = 'bottom';
      }
      this.picker.addClass('datepicker-orient-' + yorient);
      if (yorient === 'top')
        top += height;
      else
        top -= calendarHeight + parseInt(this.picker.css('padding-top'));

      this.picker.css({
        top: top,
        left: left,
        zIndex: zIndex
      });
    },

    _allow_update: true,
    update: function(){
      if (!this._allow_update)
        return;

      var oldDates = this.dates.copy(),
        dates = [],
        fromArgs = false;
      if (arguments.length){
        $.each(arguments, $.proxy(function(i, date){
          if (date instanceof Date)
            date = this._local_to_utc(date);
          dates.push(date);
        }, this));
        fromArgs = true;
      }
      else {
        dates = this.isInput
            ? this.element.val()
            : this.element.data('date') || this.element.find('input').val();
        if (dates && this.o.multidate)
          dates = dates.split(this.o.multidateSeparator);
        else
          dates = [dates];
        delete this.element.data().date;
      }

      dates = $.map(dates, $.proxy(function(date){
        return DPGlobal.parseDate(date, this.o.format, this.o.language);
      }, this));
      dates = $.grep(dates, $.proxy(function(date){
        return (
          date < this.o.startDate ||
          date > this.o.endDate ||
          !date
        );
      }, this), true);
      this.dates.replace(dates);

      if (this.dates.length)
        this.viewDate = new Date(this.dates.get(-1));
      else if (this.viewDate < this.o.startDate)
        this.viewDate = new Date(this.o.startDate);
      else if (this.viewDate > this.o.endDate)
        this.viewDate = new Date(this.o.endDate);

      if (fromArgs){
        // setting date by clicking
        this.setValue();
      }
      else if (dates.length){
        // setting date by typing
        if (String(oldDates) !== String(this.dates))
          this._trigger('changeDate');
      }
      if (!this.dates.length && oldDates.length)
        this._trigger('clearDate');

      this.fill();
    },

    fillDow: function(){
      var dowCnt = this.o.weekStart,
        html = '<tr>';
      if (this.o.calendarWeeks){
        var cell = '<th class="cw">&nbsp;</th>';
        html += cell;
        this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
      }
      while (dowCnt < this.o.weekStart + 7){
        html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
      }
      html += '</tr>';
      this.picker.find('.datepicker-days thead').append(html);
    },

    fillMonths: function(){
      var html = '',
      i = 0;
      while (i < 12){
        html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
      }
      this.picker.find('.datepicker-months td').html(html);
    },

    setRange: function(range){
      if (!range || !range.length)
        delete this.range;
      else
        this.range = $.map(range, function(d){
          return d.valueOf();
        });
      this.fill();
    },

    getClassNames: function(date){
      var cls = [],
        year = this.viewDate.getUTCFullYear(),
        month = this.viewDate.getUTCMonth(),
        today = new Date();
      if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
        cls.push('old');
      }
      else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
        cls.push('new');
      }
      if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
        cls.push('focused');
      // Compare internal UTC date with local today, not UTC today
      if (this.o.todayHighlight &&
        date.getUTCFullYear() === today.getFullYear() &&
        date.getUTCMonth() === today.getMonth() &&
        date.getUTCDate() === today.getDate()){
        cls.push('today');
      }
      if (this.dates.contains(date) !== -1)
        cls.push('active');
      if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
        $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1){
        cls.push('disabled');
      }
      if (this.range){
        if (date > this.range[0] && date < this.range[this.range.length-1]){
          cls.push('range');
        }
        if ($.inArray(date.valueOf(), this.range) !== -1){
          cls.push('selected');
        }
      }
      return cls;
    },

    fill: function(){
      // marlin
      if(this.viewDate.getTime()<86400000) this.viewDate = new Date();
      var d = new Date(this.viewDate),
        year = d.getUTCFullYear(),
        month = d.getUTCMonth(),
        startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
        startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
        endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
        endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
        todaytxt = dates[this.o.language].today || dates['en'].today || '',
        cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
        tooltip;
      if (isNaN(year) || isNaN(month)) return;
      this.picker.find('.datepicker-days thead th.datepicker-switch')
            .text(dates[this.o.language].months[month]+' '+year);
      this.picker.find('tfoot th.today')
            .text(todaytxt)
            .toggle(this.o.todayBtn !== false);
      this.picker.find('tfoot th.clear')
            .text(cleartxt)
            .toggle(this.o.clearBtn !== false);
      this.updateNavArrows();
      this.fillMonths();
      var prevMonth = UTCDate(year, month-1, 28),
        day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
      prevMonth.setUTCDate(day);
      prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
      var nextMonth = new Date(prevMonth);
      nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
      nextMonth = nextMonth.valueOf();
      var html = [];
      var clsName;
      while (prevMonth.valueOf() < nextMonth){
        if (prevMonth.getUTCDay() === this.o.weekStart){
          html.push('<tr>');
          if (this.o.calendarWeeks){
            // ISO 8601: First week contains first thursday.
            // ISO also states week starts on Monday, but we can be more abstract here.
            var
              // Start of current week: based on weekstart/current date
              ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
              // Thursday of this week
              th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
              // First Thursday of year, year from thursday
              yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
              // Calendar week: ms between thursdays, div ms per day, div 7 days
              calWeek =  (th - yth) / 864e5 / 7 + 1;
            html.push('<td class="cw">'+ calWeek +'</td>');

          }
        }
        clsName = this.getClassNames(prevMonth);
        clsName.push('day');

        if (this.o.beforeShowDay !== $.noop){
          var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
          if (before === undefined)
            before = {};
          else if (typeof(before) === 'boolean')
            before = {enabled: before};
          else if (typeof(before) === 'string')
            before = {classes: before};
          if (before.enabled === false)
            clsName.push('disabled');
          if (before.classes)
            clsName = clsName.concat(before.classes.split(/\s+/));
          if (before.tooltip)
            tooltip = before.tooltip;
        }

        clsName = $.unique(clsName);
        html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
        tooltip = null;
        if (prevMonth.getUTCDay() === this.o.weekEnd){
          html.push('</tr>');
        }
        prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
      }
      this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

      var months = this.picker.find('.datepicker-months')
            .find('th:eq(1)')
              .text(year)
              .end()
            .find('span').removeClass('active');

      $.each(this.dates, function(i, d){
        if (d.getUTCFullYear() === year)
          months.eq(d.getUTCMonth()).addClass('active');
      });

      if (year < startYear || year > endYear){
        months.addClass('disabled');
      }
      if (year === startYear){
        months.slice(0, startMonth).addClass('disabled');
      }
      if (year === endYear){
        months.slice(endMonth+1).addClass('disabled');
      }

      html = '';
      year = parseInt(year/10, 10) * 10;
      var yearCont = this.picker.find('.datepicker-years')
                .find('th:eq(1)')
                  .text(year + '-' + (year + 9))
                  .end()
                .find('td');
      year -= 1;
      var years = $.map(this.dates, function(d){
          return d.getUTCFullYear();
        }),
        classes;
      for (var i = -1; i < 11; i++){
        classes = ['year'];
        if (i === -1)
          classes.push('old');
        else if (i === 10)
          classes.push('new');
        if ($.inArray(year, years) !== -1)
          classes.push('active');
        if (year < startYear || year > endYear)
          classes.push('disabled');
        html += '<span class="' + classes.join(' ') + '">'+year+'</span>';
        year += 1;
      }
      yearCont.html(html);
    },

    updateNavArrows: function(){
      if (!this._allow_update)
        return;

      var d = new Date(this.viewDate),
        year = d.getUTCFullYear(),
        month = d.getUTCMonth();
      switch (this.viewMode){
        case 0:
          if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
            this.picker.find('.prev').css({visibility: 'hidden'});
          }
          else {
            this.picker.find('.prev').css({visibility: 'visible'});
          }
          if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
            this.picker.find('.next').css({visibility: 'hidden'});
          }
          else {
            this.picker.find('.next').css({visibility: 'visible'});
          }
          break;
        case 1:
        case 2:
          if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()){
            this.picker.find('.prev').css({visibility: 'hidden'});
          }
          else {
            this.picker.find('.prev').css({visibility: 'visible'});
          }
          if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()){
            this.picker.find('.next').css({visibility: 'hidden'});
          }
          else {
            this.picker.find('.next').css({visibility: 'visible'});
          }
          break;
      }
    },

    click: function(e){
      e.preventDefault();
      var target = $(e.target).closest('span, td, th'),
        year, month, day;
      if (target.length === 1){
        switch (target[0].nodeName.toLowerCase()){
          case 'th':
            switch (target[0].className){
              case 'datepicker-switch':
                this.showMode(1);
                break;
              case 'prev':
              case 'next':
                var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
                switch (this.viewMode){
                  case 0:
                    this.viewDate = this.moveMonth(this.viewDate, dir);
                    this._trigger('changeMonth', this.viewDate);
                    break;
                  case 1:
                  case 2:
                    this.viewDate = this.moveYear(this.viewDate, dir);
                    if (this.viewMode === 1)
                      this._trigger('changeYear', this.viewDate);
                    break;
                }
                this.fill();
                break;
              case 'today':
                var date = new Date();
                date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

                this.showMode(-2);
                var which = this.o.todayBtn === 'linked' ? null : 'view';
                this._setDate(date, which);
                break;
              case 'clear':
                var element;
                if (this.isInput)
                  element = this.element;
                else if (this.component)
                  element = this.element.find('input');
                if (element)
                  element.val("").change();
                this.update();
                this._trigger('changeDate');
                if (this.o.autoclose)
                  this.hide();
                break;
            }
            break;
          case 'span':
            if (!target.is('.disabled')){
              this.viewDate.setUTCDate(1);
              if (target.is('.month')){
                day = 1;
                month = target.parent().find('span').index(target);
                year = this.viewDate.getUTCFullYear();
                this.viewDate.setUTCMonth(month);
                this._trigger('changeMonth', this.viewDate);
                if (this.o.minViewMode === 1){
                  this._setDate(UTCDate(year, month, day));
                }
              }
              else {
                day = 1;
                month = 0;
                year = parseInt(target.text(), 10)||0;
                this.viewDate.setUTCFullYear(year);
                this._trigger('changeYear', this.viewDate);
                if (this.o.minViewMode === 2){
                  this._setDate(UTCDate(year, month, day));
                }
              }
              this.showMode(-1);
              this.fill();
            }
            break;
          case 'td':
            if (target.is('.day') && !target.is('.disabled')){
              day = parseInt(target.text(), 10)||1;
              year = this.viewDate.getUTCFullYear();
              month = this.viewDate.getUTCMonth();
              if (target.is('.old')){
                if (month === 0){
                  month = 11;
                  year -= 1;
                }
                else {
                  month -= 1;
                }
              }
              else if (target.is('.new')){
                if (month === 11){
                  month = 0;
                  year += 1;
                }
                else {
                  month += 1;
                }
              }
              this._setDate(UTCDate(year, month, day));
              // this._trigger('changeDate');
            }
            break;
        }
      }
      if (this.picker.is(':visible') && this._focused_from){
        $(this._focused_from).focus();
      }
      delete this._focused_from;
    },

    _toggle_multidate: function(date){
      var ix = this.dates.contains(date);
      if (!date){
        this.dates.clear();
      }
      if (this.o.multidate === 1 && ix === 0){
                // single datepicker, don't remove selected date
            }
      else if (ix !== -1){
        this.dates.remove(ix);
      }
      else {
        this.dates.push(date);
      }
      if (typeof this.o.multidate === 'number')
        while (this.dates.length > this.o.multidate)
          this.dates.remove(0);
    },

    _setDate: function(date, which){
      if (!which || which === 'date')
        this._toggle_multidate(date && new Date(date)); 
      if (!which || which  === 'view')
        this.viewDate = date && new Date(date);

      this.fill();
      this.setValue();
      this._trigger('changeDate');
      var element;
      if (this.isInput){
        element = this.element;
      }
      else if (this.component){
        element = this.element.find('input');
      }
      if (element){
        element.change();
      }
      if (this.o.autoclose && (!which || which === 'date')){
        this.hide();
      }
    },

    moveMonth: function(date, dir){
      if (!date)
        return undefined;
      if (!dir)
        return date;
      var new_date = new Date(date.valueOf()),
        day = new_date.getUTCDate(),
        month = new_date.getUTCMonth(),
        mag = Math.abs(dir),
        new_month, test;
      dir = dir > 0 ? 1 : -1;
      if (mag === 1){
        test = dir === -1
          // If going back one month, make sure month is not current month
          // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
          ? function(){
            return new_date.getUTCMonth() === month;
          }
          // If going forward one month, make sure month is as expected
          // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
          : function(){
            return new_date.getUTCMonth() !== new_month;
          };
        new_month = month + dir;
        new_date.setUTCMonth(new_month);
        // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
        if (new_month < 0 || new_month > 11)
          new_month = (new_month + 12) % 12;
      }
      else {
        // For magnitudes >1, move one month at a time...
        for (var i=0; i < mag; i++)
          // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
          new_date = this.moveMonth(new_date, dir);
        // ...then reset the day, keeping it in the new month
        new_month = new_date.getUTCMonth();
        new_date.setUTCDate(day);
        test = function(){
          return new_month !== new_date.getUTCMonth();
        };
      }
      // Common date-resetting loop -- if date is beyond end of month, make it
      // end of month
      while (test()){
        new_date.setUTCDate(--day);
        new_date.setUTCMonth(new_month);
      }
      return new_date;
    },

    moveYear: function(date, dir){
      return this.moveMonth(date, dir*12);
    },

    dateWithinRange: function(date){
      return date >= this.o.startDate && date <= this.o.endDate;
    },

    keydown: function(e){
      if (this.picker.is(':not(:visible)')){
        if (e.keyCode === 27) // allow escape to hide and re-show picker
          this.show();
        return;
      }
      var dateChanged = false,
        dir, newDate, newViewDate,
        focusDate = this.focusDate || this.viewDate;
      switch (e.keyCode){
        case 27: // escape
          if (this.focusDate){
            this.focusDate = null;
            this.viewDate = this.dates.get(-1) || this.viewDate;
            this.fill();
          }
          else
            this.hide();
          e.preventDefault();
          break;
        case 37: // left
        case 39: // right
          if (!this.o.keyboardNavigation)
            break;
          dir = e.keyCode === 37 ? -1 : 1;
          if (e.ctrlKey){
            newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
            newViewDate = this.moveYear(focusDate, dir);
            this._trigger('changeYear', this.viewDate);
          }
          else if (e.shiftKey){
            newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
            newViewDate = this.moveMonth(focusDate, dir);
            this._trigger('changeMonth', this.viewDate);
          }
          else {
            newDate = new Date(this.dates.get(-1) || UTCToday());
            newDate.setUTCDate(newDate.getUTCDate() + dir);
            newViewDate = new Date(focusDate);
            newViewDate.setUTCDate(focusDate.getUTCDate() + dir);
          }
          if (this.dateWithinRange(newDate)){
            this.focusDate = this.viewDate = newViewDate;
            this.setValue();
            this.fill();
            e.preventDefault();
          }
          break;
        case 38: // up
        case 40: // down
          if (!this.o.keyboardNavigation)
            break;
          dir = e.keyCode === 38 ? -1 : 1;
          if (e.ctrlKey){
            newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
            newViewDate = this.moveYear(focusDate, dir);
            this._trigger('changeYear', this.viewDate);
          }
          else if (e.shiftKey){
            newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
            newViewDate = this.moveMonth(focusDate, dir);
            this._trigger('changeMonth', this.viewDate);
          }
          else {
            newDate = new Date(this.dates.get(-1) || UTCToday());
            newDate.setUTCDate(newDate.getUTCDate() + dir * 7);
            newViewDate = new Date(focusDate);
            newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);
          }
          if (this.dateWithinRange(newDate)){
            this.focusDate = this.viewDate = newViewDate;
            this.setValue();
            this.fill();
            e.preventDefault();
          }
          break;
        case 32: // spacebar
          // Spacebar is used in manually typing dates in some formats.
          // As such, its behavior should not be hijacked.
          break;
        case 13: // enter
          focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
          if (this.o.keyboardNavigation) {
            this._toggle_multidate(focusDate);
            dateChanged = true;
          }
          this.focusDate = null;
          this.viewDate = this.dates.get(-1) || this.viewDate;
          this.setValue();
          this.fill();
          if (this.picker.is(':visible')){
            e.preventDefault();
            if (this.o.autoclose)
              this.hide();
          }
          break;
        case 9: // tab
          this.focusDate = null;
          this.viewDate = this.dates.get(-1) || this.viewDate;
          this.fill();
          this.hide();
          break;
      }
      if (dateChanged){
        if (this.dates.length)
          this._trigger('changeDate');
        else
          this._trigger('clearDate');
        var element;
        if (this.isInput){
          element = this.element;
        }
        else if (this.component){
          element = this.element.find('input');
        }
        if (element){
          element.change();
        }
      }
    },

    showMode: function(dir){
      if (dir){
        this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
      }
      this.picker
        .find('>div')
        .hide()
        .filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName)
          .css('display', 'block');
      this.updateNavArrows();
    }
  };

  var DateRangePicker = function(element, options){
    this.element = $(element);
    this.inputs = $.map(options.inputs, function(i){
      return i.jquery ? i[0] : i;
    });
    delete options.inputs;

    $(this.inputs)
      .datepicker(options)
      .bind('changeDate', $.proxy(this.dateUpdated, this));

    this.pickers = $.map(this.inputs, function(i){
      return $(i).data('datepicker');
    });
    this.updateDates();
  };
  DateRangePicker.prototype = {
    updateDates: function(){
      this.dates = $.map(this.pickers, function(i){
        return i.getUTCDate();
      });
      this.updateRanges();
    },
    updateRanges: function(){
      var range = $.map(this.dates, function(d){
        return d.valueOf();
      });
      $.each(this.pickers, function(i, p){
        p.setRange(range);
      });
    },
    dateUpdated: function(e){
      // `this.updating` is a workaround for preventing infinite recursion
      // between `changeDate` triggering and `setUTCDate` calling.  Until
      // there is a better mechanism.
      if (this.updating)
        return;
      this.updating = true;

      var dp = $(e.target).data('datepicker'),
        new_date = dp.getUTCDate(),
        i = $.inArray(e.target, this.inputs),
        l = this.inputs.length;
      if (i === -1)
        return;

      $.each(this.pickers, function(i, p){
        if (!p.getUTCDate())
          p.setUTCDate(new_date);
      });

      if (new_date < this.dates[i]){
        // Date being moved earlier/left
        while (i >= 0 && new_date < this.dates[i]){
          this.pickers[i--].setUTCDate(new_date);
        }
      }
      else if (new_date > this.dates[i]){
        // Date being moved later/right
        while (i < l && new_date > this.dates[i]){
          this.pickers[i++].setUTCDate(new_date);
        }
      }
      this.updateDates();

      delete this.updating;
    },
    remove: function(){
      $.map(this.pickers, function(p){ p.remove(); });
      delete this.element.data().datepicker;
    }
  };

  function opts_from_el(el, prefix){
    // Derive options from element data-attrs
    var data = $(el).data(),
      out = {}, inkey,
      replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
    prefix = new RegExp('^' + prefix.toLowerCase());
    function re_lower(_,a){
      return a.toLowerCase();
    }
    for (var key in data)
      if (prefix.test(key)){
        inkey = key.replace(replace, re_lower);
        out[inkey] = data[key];
      }
    return out;
  }

  function opts_from_locale(lang){
    // Derive options from locale plugins
    var out = {};
    // Check if "de-DE" style date is available, if not language should
    // fallback to 2 letter code eg "de"
    if (!dates[lang]){
      lang = lang.split('-')[0];
      if (!dates[lang])
        return;
    }
    var d = dates[lang];
    $.each(locale_opts, function(i,k){
      if (k in d)
        out[k] = d[k];
    });
    return out;
  }

  var old = $.fn.datepicker;
  $.fn.datepicker = function(option){
    var args = Array.apply(null, arguments);
    args.shift();
    var internal_return;
    this.each(function(){
      var $this = $(this),
        data = $this.data('datepicker'),
        options = typeof option === 'object' && option;
      if (!data){
        var elopts = opts_from_el(this, 'date'),
          // Preliminary otions
          xopts = $.extend({}, defaults, elopts, options),
          locopts = opts_from_locale(xopts.language),
          // Options priority: js args, data-attrs, locales, defaults
          opts = $.extend({}, defaults, locopts, elopts, options);
        if ($this.is('.input-daterange') || opts.inputs){
          var ropts = {
            inputs: opts.inputs || $this.find('input').toArray()
          };
          $this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
        }
        else {
          $this.data('datepicker', (data = new Datepicker(this, opts)));
        }
      }
      if (typeof option === 'string' && typeof data[option] === 'function'){
        internal_return = data[option].apply(data, args);
        if (internal_return !== undefined)
          return false;
      }
    });
    if (internal_return !== undefined)
      return internal_return;
    else
      return this;
  };

  var defaults = $.fn.datepicker.defaults = {
    autoclose: false,
    beforeShowDay: $.noop,
    calendarWeeks: false,
    clearBtn: false,
    daysOfWeekDisabled: [],
    endDate: Infinity,
    forceParse: true,
    format: 'mm/dd/yyyy',
    keyboardNavigation: true,
    language: 'en',
    minViewMode: 0,
    multidate: false,
    multidateSeparator: ',',
    orientation: "auto",
    rtl: false,
    startDate: -Infinity,
    startView: 0,
    todayBtn: false,
    todayHighlight: false,
    weekStart: 0
  };
  var locale_opts = $.fn.datepicker.locale_opts = [
    'format',
    'rtl',
    'weekStart'
  ];
  $.fn.datepicker.Constructor = Datepicker;
  var dates = $.fn.datepicker.dates = {
    en: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: "Today",
      clear: "Clear"
    }
  };

  var DPGlobal = {
    modes: [
      {
        clsName: 'days',
        navFnc: 'Month',
        navStep: 1
      },
      {
        clsName: 'months',
        navFnc: 'FullYear',
        navStep: 1
      },
      {
        clsName: 'years',
        navFnc: 'FullYear',
        navStep: 10
    }],
    isLeapYear: function(year){
      return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    },
    getDaysInMonth: function(year, month){
      return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },
    validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
    nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
    parseFormat: function(format){
      // IE treats \0 as a string end in inputs (truncating the value),
      // so it's a bad format delimiter, anyway
      var separators = format.replace(this.validParts, '\0').split('\0'),
        parts = format.match(this.validParts);
      if (!separators || !separators.length || !parts || parts.length === 0){
        throw new Error("Invalid date format.");
      }
      return {separators: separators, parts: parts};
    },
    parseDate: function(date, format, language){
      if (!date)
        return undefined;
      if (date instanceof Date)
        return date;
      if (typeof format === 'string')
        format = DPGlobal.parseFormat(format);
      var part_re = /([\-+]\d+)([dmwy])/,
        parts = date.match(/([\-+]\d+)([dmwy])/g),
        part, dir, i;
      if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
        date = new Date();
        for (i=0; i < parts.length; i++){
          part = part_re.exec(parts[i]);
          dir = parseInt(part[1]);
          switch (part[2]){
            case 'd':
              date.setUTCDate(date.getUTCDate() + dir);
              break;
            case 'm':
              date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
              break;
            case 'w':
              date.setUTCDate(date.getUTCDate() + dir * 7);
              break;
            case 'y':
              date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
              break;
          }
        }
        return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
      }
      parts = date && date.match(this.nonpunctuation) || [];
      date = new Date();
      var parsed = {},
        setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
        setters_map = {
          yyyy: function(d,v){
            return d.setUTCFullYear(v);
          },
          yy: function(d,v){
            return d.setUTCFullYear(2000+v);
          },
          m: function(d,v){
            if (isNaN(d))
              return d;
            v -= 1;
            while (v < 0) v += 12;
            v %= 12;
            d.setUTCMonth(v);
            while (d.getUTCMonth() !== v)
              d.setUTCDate(d.getUTCDate()-1);
            return d;
          },
          d: function(d,v){
            return d.setUTCDate(v);
          }
        },
        val, filtered;
      setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
      setters_map['dd'] = setters_map['d'];
      date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
      var fparts = format.parts.slice();
      // Remove noop parts
      if (parts.length !== fparts.length){
        fparts = $(fparts).filter(function(i,p){
          return $.inArray(p, setters_order) !== -1;
        }).toArray();
      }
      // Process remainder
      function match_part(){
        var m = this.slice(0, parts[i].length),
          p = parts[i].slice(0, m.length);
        return m === p;
      }
      if (parts.length === fparts.length){
        var cnt;
        for (i=0, cnt = fparts.length; i < cnt; i++){
          val = parseInt(parts[i], 10);
          part = fparts[i];
          if (isNaN(val)){
            switch (part){
              case 'MM':
                filtered = $(dates[language].months).filter(match_part);
                val = $.inArray(filtered[0], dates[language].months) + 1;
                break;
              case 'M':
                filtered = $(dates[language].monthsShort).filter(match_part);
                val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                break;
            }
          }
          parsed[part] = val;
        }
        var _date, s;
        for (i=0; i < setters_order.length; i++){
          s = setters_order[i];
          if (s in parsed && !isNaN(parsed[s])){
            _date = new Date(date);
            setters_map[s](_date, parsed[s]);
            if (!isNaN(_date))
              date = _date;
          }
        }
      }
      return date;
    },
    formatDate: function(date, format, language){
      if (!date)
        return '';
      if (typeof format === 'string')
        format = DPGlobal.parseFormat(format);
      var val = {
        d: date.getUTCDate(),
        D: dates[language].daysShort[date.getUTCDay()],
        DD: dates[language].days[date.getUTCDay()],
        m: date.getUTCMonth() + 1,
        M: dates[language].monthsShort[date.getUTCMonth()],
        MM: dates[language].months[date.getUTCMonth()],
        yy: date.getUTCFullYear().toString().substring(2),
        yyyy: date.getUTCFullYear()
      };
      val.dd = (val.d < 10 ? '0' : '') + val.d;
      val.mm = (val.m < 10 ? '0' : '') + val.m;
      date = [];
      var seps = $.extend([], format.separators);
      for (var i=0, cnt = format.parts.length; i <= cnt; i++){
        if (seps.length)
          date.push(seps.shift());
        date.push(val[format.parts[i]]);
      }
      return date.join('');
    },
    headTemplate: '<thead>'+
              '<tr>'+
                '<th class="prev">&laquo;</th>'+
                '<th colspan="5" class="datepicker-switch"></th>'+
                '<th class="next">&raquo;</th>'+
              '</tr>'+
            '</thead>',
    contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
    footTemplate: '<tfoot>'+
              '<tr>'+
                '<th colspan="7" class="today"></th>'+
              '</tr>'+
              '<tr>'+
                '<th colspan="7" class="clear"></th>'+
              '</tr>'+
            '</tfoot>'
  };
  DPGlobal.template = '<div class="datepicker">'+
              '<div class="datepicker-days">'+
                '<table class=" table-condensed">'+
                  DPGlobal.headTemplate+
                  '<tbody></tbody>'+
                  DPGlobal.footTemplate+
                '</table>'+
              '</div>'+
              '<div class="datepicker-months">'+
                '<table class="table-condensed">'+
                  DPGlobal.headTemplate+
                  DPGlobal.contTemplate+
                  DPGlobal.footTemplate+
                '</table>'+
              '</div>'+
              '<div class="datepicker-years">'+
                '<table class="table-condensed">'+
                  DPGlobal.headTemplate+
                  DPGlobal.contTemplate+
                  DPGlobal.footTemplate+
                '</table>'+
              '</div>'+
            '</div>';

  $.fn.datepicker.DPGlobal = DPGlobal;


  /* DATEPICKER NO CONFLICT
  * =================== */

  $.fn.datepicker.noConflict = function(){
    $.fn.datepicker = old;
    return this;
  };


  /* DATEPICKER DATA-API
  * ================== */

  $(document).on(
    'focus.datepicker.data-api click.datepicker.data-api',
    '[data-provide="datepicker"]',
    function(e){
      var $this = $(this);
      if ($this.data('datepicker'))
        return;
      e.preventDefault();
      // component click requires us to explicitly show it
      $this.datepicker('show');
    }
  );
  $(function(){
    $('[data-provide="datepicker-inline"]').datepicker();
  });

}(window.jQuery));

 /******************************************************************
  *
  * 全局方法集合
  * creator： yjl
  * date: 2016-03-31
  *
  *******************************************************************/

 Jma.module('Funcs', function(Dicts, Funcs, Backbone, Marionette, $, _) {
     /*
      * 四舍五入保留小数不够补全0
      * val： 数值
      * length: 保留小数位数
      */
     Funcs.fixedNum = function(val, length) {
         if (length < 0) length = 0;
         var fixedNum = Math.round(parseFloat(val) * Math.pow(10, length + 1) / 10) / Math.pow(10, length);
         var decimalLength = (fixedNum.toString().split(".")[1] ? fixedNum.toString().split(".")[1].length : 0);
         if (isNaN(fixedNum)) {
             return '0.00';
         } else {
             if (decimalLength == 0 && length !== 0) {
                 fixedNum = fixedNum + '.';
             }
             for (var i = decimalLength; i < length; i++) {
                 fixedNum = fixedNum.toString() + '0';
             }
             return fixedNum + '';
         }
     };
     Funcs.getDate = function() {
         var presentDate = new Date();
         var year = presentDate.getFullYear();
         var month = presentDate.getMonth() + 1;
         var date = presentDate.getDate();
         var weekday = presentDate.getDay();
         var riqi = year + '-' + month + '-' + date;
         return {
             date: {
                 riqi: riqi,
                 weekday: "星期" + weekday
             }
         }
     };
     Funcs.getWeekDay = function(datevalue) {
         var newDate = new Date(datevalue)
         var str = "";
         switch (newDate.getDay()) {
             case 1:
                 str = "星期一"
                 break;
             case 2:
                 str = "星期二"
                 break;
             case 3:
                 str = "星期三"
                 break;
             case 4:
                 str = "星期四"
                 break;
             case 5:
                 str = "星期五"
                 break;
             case 6:
                 str = "星期六"
                 break;
             case 7:
                 str = "星期日"
                 break;
         }
         return str;
     }

 });

(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['marionette', 'backbone', 'underscore'], function(Marionette, Backbone, _) {
      return (root.Jma = factory(root, Marionette, Backbone, _));
    });
  } else if (typeof exports !== 'undefined') {
    var Marionette = require('marionette');
    var Backbone = require('backbone');
    var _ = require('underscore');
    module.exports = factory(root, Marionette, Backbone, _);
  } else {
    root.Jma = factory(root, root.Marionette, root.Backbone, root._);
  }

}(this, function(root, Marionette, Backbone, _) {

    "use strict";
    //命名空间
    var Jma = new Marionette.Application();
    //版本号
    Jma.VERSION = '0.0.0';
    //默认region加载
    Jma.addInitializer(function(){
        Jma.addRegions({
            navRegion: '#nav',
            headerRegion: '#header',
            mainRegion: '#main',
            footerRegion: '#footer',
        });
    });
    //路由扩展
    Jma.AppRouter = Marionette.AppRouter.extend({
        onRoute:function(name,path,args){
            var router = {name:name,path:path,args:args};
            Jma.commands.execute('change:Router',router);
        }
    });
    Jma.on('start', function(options) {
        if (Backbone.history){
            Backbone.history.start();
        }
    });
    return Jma;
}));
/**
 * Joywok jssdk.js
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    var _ = require('underscore');
    var $ = require('jQuery');
    module.exports = factory(root, $, _);
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(['underscore','jQuery'], function(_) {
      return (root.jw = factory(root, $, _));
    });
  } else {
    root.jw = factory(root, root.jQuery, root._ );
  }
}(this, function(root, $, _ ) {
  var jwParams = defaultParams = {
    debug: false,   // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appid: '',      // 必填，公众号的唯一标识
    timestamp: 0,   // 必填，生成签名的时间戳
    nonceStr: '',   // 必填，生成签名的随机串
    signature: '',  // 必填，签名，见附录1
    jsApiList: []   // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  };

  function JWBridge( func_name, data, origindata ){
    root.JoywokMobileApp ? JoywokMobileApp.callHandler(
        func_name
        , combineData(data)
        , function(resp) {
          jw.callback( func_name, resp, origindata );
        }
    ) : innerInvoke( func_name, origindata ) ;
  }

  /**
   * func_name 方法名
   * resp 返回报文
   * cb 回调函数
   * status: {"checkResult":{"setTitle":true},"status":"checkJsApi:ok"}
   */
  function callback( func_name, resp, cb ){
    // alert('callback['+func_name+']['+typeof resp+']['+JSON.stringify(resp)+']');
    if( typeof resp === 'string' ) resp = JSON.parse(resp);
    var d,e,f;
    switch(
      delete resp.err_code,
      delete resp.err_desc,
      delete resp.err_detail,
      d = resp.errMsg,
      // alert(d),
      // d||(d=resp.err_msg,delete resp.err_msg,d=h(a,d),resp.errMsg=d),
      cb = cb||{},
      cb._complete && (cb._complete(resp), delete cb._complete),
      d = resp.errMsg||"",
      jw.config.debug && !cb.isInnerInvoke && alert(JSON.stringify(resp)),
      e = d.indexOf(":"),
      f = d.substring(e+1)){
      case"ok":
        cb.success && cb.success( resp );
        break;
      case "cancel":
        cb.cancel && cb.cancel( resp );
        break;
      default:
        cb.fail && cb.fail( resp )
    }
    cb.complete && cb.complete(resp)
  }

  function innerInvoke( func_name, data ){
    console.log('innerInvoke', func_name, data, jw.config);
    if(!(!jw.config.debug||data&&data.isInnerInvoke)){
      var c = route_list[func_name];
      c&&(func_name=c),data&&data._complete&&delete data._complete,console.log('"'+func_name+'",',data||"");
    }
  }

  function addDebug( func_name, data ){
    console.log('"'+func_name+'",',data||"")
  }

  function combineData( data ){
    // 如果是数组，则直接传入数据
    // if( Object.prototype.toString.call( data ) === '[object Array]' ) return data;
    return data = data||{},
      data.appId = jwParams.appid,
      data.verifyAppId = jwParams.appid,
      data.verifySignType = "sha1",
      data.verifyTimestamp = jwParams.timestamp+"",
      data.verifyNonceStr = jwParams.nonceStr,
      data.verifySignature = jwParams.signature,
      data;
      // JSON.stringify(data);
  }

  var func_list, route_list;
  func_list = {
    config: 'config',
    setTitle: 'setTitle',
    onMenuShareTimeline:"menu:share:timeline",
    onMenuShareWechat:"menu:share:wechat"
  };

  route_list = function(){
    var key, routes = {};
    for(key in func_list)
      routes[func_list[key]]=key;
    return routes;
  }();

  var jw = jw || {
    callback: callback,
    connectJoywokMobileApp: function( callback ){
      if (window.JoywokMobileApp) {
        callback(JoywokMobileApp)
      } else {
        // 全局注册方法 JoywokMobileAppReady
        document.addEventListener(
          'JoywokMobileAppReady'
          , function() {
            callback(JoywokMobileApp)
          },
          false
        );
      }
    },
    config: function( params ){
      jwParams = jw.configs = _.extend( defaultParams, params );
      // alert('config 1')
      jw.connectJoywokMobileApp(function(bridge) {
        // alert('config 2')
        bridge.init(function(message, responseCallback) {
          /*console.log('JS got a message', message);
          setTimeout(function(){
            alert(message);
          },1000)*/
          var data = {
            'Javascript Responds': '测试中文!'
          };
          responseCallback(data);
        });
        // 注册 ready/error等一些函数
        /*bridge.registerHandler("functionInJs", function(data, responseCallback) {
          document.getElementById("show").innerHTML = ("data from Java: = " + data);
          var responseData = "Javascript Says Right back aka!";
          responseCallback(responseData);
        });*/
        bridge.registerHandler("onFilter", function(data, responseCallback) {
          alert('onFilter');
        });
        bridge.registerHandler("onSelectTab", function(data, responseCallback) {
          if( typeof onJwSelectTab == 'function' ) onJwSelectTab(data);
        });
        bridge.registerHandler("onShowAppMore", function(data, responseCallback) {
          alert('onShowAppMore');
        });
        // 用户点击右上角功能按钮
        bridge.registerHandler("onNavBtnClick", function(data, responseCallback) {
          // alert('onNavBtnClick');
          if( typeof onJwNavBtnClick == 'function' ) onJwNavBtnClick(data);
        });
      });
    },
    setTitle: function( origindata ){
      var data = {title: origindata.title};
      JWBridge( 'setTitle', data, origindata );
    },
    checkJsApi: function( origindata ){
      JWBridge( 'checkJsApi', { "jsApiList": origindata.jsApiList }, origindata );
    },
    getInfo: function( origindata ){
      JWBridge( 'getInfo', {}, origindata );
    },
    pushWebView: function( origindata ){
      var data = {url: origindata };
      JWBridge( 'pushWebView', data, origindata );
    },
    newWebView: function( origindata ){
      var data = {url: origindata };
      JWBridge( 'newWebView', data, origindata );
    },
    closeWebView: function( origindata ){
      JWBridge( 'closeWebView', {}, origindata );
    },
    // type: 0:filter; 1: 系统More按钮; 2: 应用More按钮;
    setFuncBtns: function( origindata ){
      /*var data = {type: origindata.type };
      origindata.text && (data.text = origindata.text);
      origindata.logo && (data.logo = origindata.logo);*/
      var data = {buttons: origindata};
      JWBridge( 'setFuncBtns', data, origindata );
    },
    setFuncBtnStatus: function( origindata ){
      var data = origindata;
      JWBridge( 'setFuncBtnStatus', data, origindata );
    },
    showTabs: function( origindata){
      var data = {tabs: origindata.tabs, selector: origindata.selector, style: origindata.style, style: origindata.style };
      JWBridge( 'showTabs', data, origindata );
    },
    hideTabs: function(origindata){
      JWBridge( 'hideTabs', {}, origindata );
    },
    mailto: function( origindata ){
      var data = {email: origindata.email };
      JWBridge( 'mailto', data, origindata );
    },
    back: function( origindata ){
      JWBridge( 'back', {}, origindata );
    },
    onSelectTab: function( index ){
      // alert('onSelectTab ['+index+']');
      if( typeof window.onJwSelectTab == 'function' ) window.onJwSelectTab(data);
    },
    onNavBtnClick: function( data ){
      if( typeof window.onJwNavBtnClick == 'function' ) window.onJwNavBtnClick(data);
    }/*,
    onFilter: function(){
      alert('onFilter')
    },
    onAdd:function(){
      alert('onAdd')
    },
    onSchedule: function(){
      alert('onSchedule');
    }*/
  };

  return jw;
}));
/******************************************************************
 *
 * 全局路由
 * creator： yjl
 * date: 2016-03-31
 *******************************************************************/
Jma.module('Router', function(Router, Jma, Backbone, Marionette, $, _){
    Router.Router = Jma.AppRouter.extend({
        appRoutes:{
            '':'index',
            'regist':'index',
        }
    });
    Router.Controller = Marionette.Controller.extend({
        index: function(){
            Backbone.history.navigate('#regist');
            Jma.Regist.StartApp();
        },
        post: function(){
            console.log(123);
            Jma.Post.StartApp();
        }
    });
    Router.on('start', function(){
        new Router.Router({
            controller: new Router.Controller
        });
    });
});


$(function(argument) {
  Jma.start();
});
/******************************************************************
 *
 * 全局模板
 * creator： yjl
 * date: 2016-03-31
 *
 *******************************************************************/
Jma.module('Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	// 无Label 表单项模板
  Templates.Form_Field_template_0_12 = _.template('\
    <div class="form-group field-<%= key %>">\
      <div class="col-sm-12 project-form-value">\
      <span data-editor></span>\
      <p class="help-block" data-error></p>\
      <p class="help-block"><%= help %></p>\
      </div>\
    </div>\
  ');

  Templates.datalist = _.template('\
    <div data-region="filter"></div>\
    <div data-region="list-content"></div>\
    <div data-region="pagination"></div>\
  ');

  Templates.emptyTemplate = _.template('\
    <div class="loading"><img src="/public/images/new_osn/loading.gif"/> loading</div>\
  ');

  Templates.Form_Field_template_3_9_nomax_tips = _.template('\
      <div class="form-group field-<%= key %>">\
        <label class="col-xs-3 control-label" for="<%= editorId %>"><%= description %> <%= title %></label>\
        <div class="col-xs-9">\
        <span data-editor></span>\
        </div>\
      </div>\
    ');
	
});
/******************************************************************
 *
 * 全局视图
 * creator： yjl
 * date: 2016-03-31
 *
 *******************************************************************/
Jma.module('Views',function(Views, Jma, Backbone, Marionette, $, _){
	
    Views.Layout = Marionette.LayoutView.extend({
        template: 'demo',
        render: function() {
            var that = this;
            this.resolveUIRegions();
            Marionette.LayoutView.prototype.render.apply(this, arguments);
            this.$('[data-region]').each(function(i, item) {
            var region = $(item).attr('data-region');
            var region2 = $.camelCase(region);
            region2 && that.addRegion(region2 + 'Region', {el:$(item)} );
            });
            return this;
        },
        resolveUIRegions:function(){
            if(!this.ui)return;
                for(var i in this.ui){
                this.addRegion(i+'Region',this.ui[i])
            }
        },
        resolveTemplateRegions:function(){
            var that = this,
            regionAttr = this.regionAttr,
            region_selector = '['+regionAttr+']';
            this.$el.find(region_selector).each(function(i, item) {
                var region = $(item).attr(regionAttr);
                region&&that.addRegion($.camelCase(region)+'Region', '['+regionAttr+'='+region+']');
            });
            this.triggerMethod('resoveregion');
        },
        serializeData: function() {
            var data = Marionette.LayoutView.prototype.serializeData.apply(this, arguments);
            return _.size(data)&&data||this.options;
        }
    });

    Views.ItemView = Marionette.ItemView.extend({
        constructor: function(options) {
          this.options = _.defaults(options, _.result(this.defaults));
          Marionette.ItemView.prototype.constructor.apply(this, arguments);
        },
        template: _.template('')
    });

    Views.CompositeView = Marionette.CompositeView.extend({
        emptyView: Views.EmptyView,
        childViewContainer: "",
        template: _.template(''),
        getChildView: function(item) {
          return Views[item.get('viewType')] || Marionette.getOption(this, "childView") || this.constructor;
        }
    });

    Views.Item = Views.ItemView.extend({
        tagName: 'li',
        template: _.template('<a href="#<%- value %>"><%= name %></a>'),
        ui: {
          links: 'a',
          buttons: '.btn',
          editClass: '.js-edit',
          deleteClass: '.js-delete'
        },
        events: {
          'click @ui.links': 'onClick',
          'click @ui.buttons': 'onPress'
        },
        triggers: {
          'click @ui.editClass': 'edit',
          'click @ui.deleteClass': 'delete'
        },
        onClick: function() {
          this.trigger('clicked', this.model);
        },
        onPress: function() {
          this.trigger('pressed', this.model);
        }
      });
      
      Views.List = Views.CompositeView.extend({
        tagName: 'ul',
        template: _.template(''),
        childView: Views.Item
      });


      Views.EmptyView = Marionette.ItemView.extend({
        template: Jma.Templates.emptyTemplate,
      });

})


$.notifyDefaults({
    type: 'warning',
    placement: {align: 'center'},
    mouse_over: 'pause',
    z_index: 9999,
  //  animate: {
  //    enter: 'animated bounceInDown',
  //    exit: 'animated bounceOutUp'
  //  },
    template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">' +
      '<span aria-hidden="true" class="fa fa-remove"></span><span class="sr-only">Close</span>' +
      '</button>' +
      '<span data-notify="icon"></span> ' +
      '<span data-notify="title">{1}</span> ' +
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
      '<a href="{3}" target="{4}" data-notify="url"></a>' +
    '</div>'
  });
Jma.Notify = $.notify;

// Jma.Dialog = BootstrapDialog;
//
// Jma.Dialog.confirm = function(message, callback) {
//   $(document).addClass('overflow');
//     return new BootstrapDialog({
//         title: '确认',
//         message: message,
//         cssClass:'confirm-dialog',
//         closable: true,
//         data: {
//             'callback': callback
//         },
//         buttons: [{
//                 label: '取消',
//                 action: function(dialog) {
//                     typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(false);
//                     $(document).removeClass('overflow');
//                     dialog.close();
//                 }
//             }, {
//                 label: '确定',
//                 cssClass: 'btn-success',
//                 action: function(dialog) {
//                     typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true);
//                     $(document).removeClass('overflow');
//                     dialog.close();
//                 }
//             }]
//     }).open();
// };
//
//
// Jma.Dialog.alert = function(message, callback) {
//   return new BootstrapDialog({
//       title: '警告',
//       message: message,
//       cssClass:'confirm-dialog',
//       closable: true,
//       data: {
//           'callback': callback
//       },
//       buttons: [{
//               label: '确定',
//               cssClass: 'btn-success',
//               action: function(dialog) {
//                   typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true);
//                   dialog.close();
//               }
//           }]
//   }).open();
// };
//
// Jma.Dialog.configDefaultOptions({
// 	title: '提示：',
// 	closeByBackdrop: false,
// });
//
// Jma.Controller = Marionette.Controller.extend({
// 	Layout:Marionette.LayoutView,
// 	getLayout:function(){
// 		this.layout = this.layout||new this.Layout();
// 		return this.layout;
// 	}
// });

Jma.Dialog = {};
Jma.Dialog.alert = function(options){
  $('.custom-alert').remove();
  var clientH = document.documentElement.clientHeight || document.body.clientHeight;
  var el = $('<div class="custom-alert '+(options["buttons"].length>1?'custom-confirm':'')+'">\
						<div class="custom-alert-bg"></div>\
						<div class="custom-alert-w visiHide">\
							'+(options["hasClose"]?'<div class="custom-alert-close">\
								<i class="fa fa-close"></i>\
							</div>':'')+'\
							<div class="custom-alert-c">\
								'+options["content"]+'\
							</div>\
							<div class="custom-alert-btn">\
							  '+(_.map(options["buttons"],function(item){
                    return '<button type="button" class="btn btn1 '+item["cssClass"]+'">'+item["label"]+'</button>'
                  }).join(""))+'\
							</div>\
						</div>\
					</div>');

  var container = el.find('.custom-alert-w');
  var btn = el.find('.custom-alert-btn');
  $('body').append(el);
  setTimeout(function(){
    console.log(container.height(),clientH,btn.height());
    if(container.height() > clientH - btn.height()){
      container.find('.custom-alert-c').css({maxHeight:clientH-30-30+'px',overflowY:'auto'})
      container.css({top:0,bottom:0}).removeClass('visiHide');
    }else{
      container.css({marginTop:'-'+(container.height()/2)+'px'}).removeClass('visiHide')
    }
  },0)
  el.delegate('.custom-alert-close','click',function(){
    el.remove();
  })
  _.each(options["buttons"],function(i){
    el.delegate('.'+i["cssClass"],'click',function(){
      if(i['action']){
        el.remove();
        i['action']()
      }
    })
  })
}
Jma.Dialog.confirm = Jma.Dialog.alert


Jma.Loading = {};

//type:1,2,3,4,5

Jma.Loading.template = {
  1:'<div class="loading-1"></div>',
  2:'<div class="loading-2">\
      <div class="loading-2-bounce1"></div>\
      <div class="loading-2-bounce2"></div>\
     </div>',
  3:'<div class="loading-3">\
      <div class="rect1"></div>\
      <div class="rect2"></div>\
      <div class="rect3"></div>\
      <div class="rect4"></div>\
      <div class="rect5"></div>\
     </div>',
  4:'<div class="loading-4">\
      <div class="bounce1"></div>\
      <div class="bounce2"></div>\
      <div class="bounce3"></div>\
     </div>',
  5:'<div class="loading-5">\
      <div class="sk-circle1 sk-circle"></div>\
      <div class="sk-circle2 sk-circle"></div>\
      <div class="sk-circle3 sk-circle"></div>\
      <div class="sk-circle4 sk-circle"></div>\
      <div class="sk-circle5 sk-circle"></div>\
      <div class="sk-circle6 sk-circle"></div>\
      <div class="sk-circle7 sk-circle"></div>\
      <div class="sk-circle8 sk-circle"></div>\
      <div class="sk-circle9 sk-circle"></div>\
      <div class="sk-circle10 sk-circle"></div>\
      <div class="sk-circle11 sk-circle"></div>\
      <div class="sk-circle12 sk-circle"></div>\
     </div>'
}

Jma.Loading.main = Backbone.View.extend({
  initialize:function(options){
    _.extend(this,options)
    this.$el = $('<div class="loading-specail">\
                    <div class="loading-specail-w"></div>\
                   </div>')
    this._init_render();
    this._init_value();

    if(this.specailClassName){
      this.$el.addClass(this.specailClassName);
    }


    if(this.region){
      this.region.append(this.$el)
    }
  },
  _init_render:function(){
    this.$el.find('.loading-specail-w').append(Jma.Loading.template[this.type])
  },
  _init_value:function(){
    if(this.value){
      this.$el.append('<div class="loading-specail-value">'+this.value+'</div>');
    }
  },
  close:function(){
    this.$el.remove();
  }
})


