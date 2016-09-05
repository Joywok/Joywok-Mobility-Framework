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
            if (!this.button) throw new Error("Upload button must be specified.");

            this.collectionName = this.collectionName || Juggler.Entities.Collection;
            this.viewsName = this.viewsName || Juggler.Views.AttachesView;
            // this.template = this.template || Juggler.Entities.Collection;
            // this.collection = new Juggler.Entities.Collection(this.model.get(this.key));
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
    Components.Form.editors.OpenBar = Components.Form.editors.Base.extend({
        className: 'togger',
        render: function() {
            var self = this;
            this.$container = $('<input type="checkbox" class="togger-btn" id="togger-' + this.key + '"/>\
                                <label for="togger-' + this.key + '">\
                                  <i></i>\
                                </label>')

            this.checkbox = this.$container.find('.togger-btn');
            if (this.model.get(this.key)){
                this.checkbox.attr({ checked: 'checked' })
            }
            this._init_bindEvent();

            setTimeout(function() {
                self.$el.append(self.$container);
            }, 0)
        },
        _init_bindEvent: function() {
            var self = this;
            this.checkbox.on('change', function() {
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
    Components.Form.editors.selectUser_view = Backbone.View.extend({
        className: 'list-item',
        initialize: function() {},
        render: function() {
            this.$el.html('<div class="list-item-w">\
                        <label>' + this.model.get("name") + '</label>\
                        <div class="checkbox-w">\
                          <input type="checkbox" id="' + this.model.get("id") + '-checkbox-1"/>\
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
                self.model.set({ checked: data })
            })
        }
    })
    Components.Form.editors.selectUser_commection = Backbone.Collection.extend({})
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
                                  <i class="fa fa-plus"></i>\
                                </div>\
                                <div class="select-user-add-val">新增组</div>\
                              </div>\
                              <div class="select-user-c"></div>\
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
                                <h1 class="ellipsis">选择用户</h1>\
                               </div>\
                              </div>\
                              <div class="select-user-list-c list">\
                                <div class="list-w">\
                              </div>\
                              <div class="select-user-select hide"></div>\
                            </div>')
                UserList.css({ left: clientW + 'px', width: clientW + 'px' })
                $('body').append(UserList);
                UserList.stop().animate({ left: 0 });
                UserList.delegate('.back', 'click', function(){
                    UserList.remove();
                })
                UserList.delegate('.save', 'click', function() {
                    UserList.remove();
                })
                self.container = UserList.find('.list-w');
                self.collection.reset([{ id: '1111', name: '22222', checked: false }])
                    // self.collection.fetch({success:function(collection,resp){
                    // console.log(resp)
                    // }})
          UserList.css({left:clientW+'px',width:clientW+'px'})
          $('body').append(UserList);
          UserList.stop().animate({left:0});
          UserList.delegate('.back','click',function(){
            UserList.remove();
          })
          UserList.delegate('.save','click',function(){
            UserList.remove();
          })
          self.container = UserList.find('.list-w');
          self.collection.reset([{id:'1111',name:'22222',checked:false}])
          // self.collection.fetch({success:function(collection,resp){
            // console.log(resp)
          // }})
       

            })
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
      className:'form-select',
      render:function(){
        console.log(this)
        // <option value ="volvo">Volvo</option>\
        var html = _.map(this.schema.list,function(i){
            return '<option value="'+i["key"]+'">'+i["val"]+'</option>'
        }).join('')
        this.$el.html('<select class="form-select-w">'+html+'</select>')
        this._init_bindEvent();
      },
      _init_bindEvent:function(){
        this.select = this.$el.delegate('.form-select-w');
        // this.select.val(this.model.get(this.key) || this.schema.list[0]['key']);

        // $("#sel  option[value='s2'] ").attr("selected",true)
        // console.log(this.model.get(this.key))
        this.select.find('option[value='+(this.model.get(this.key) || this.schema.list[0]['key'])+']').attr("selected",true)

        this.select.on('change',function(evt){
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
});
