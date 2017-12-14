import React,{PropType,Component} from 'react';
import { connect } from 'dva';
import Form from "jw-form/dist/mobile";
import { createForm } from 'rc-form';
import async from "../../utils/formFetch";

class Schema extends React.Component {
  constructor(props) {
    super(props);
    let self = this;
    let schema = this.props.schema;
    let _schema = [];

    if(schema[0].element == "Section"){
      
      for(let i in schema){
        if(schema[i].label != "" || schema[i].logo != ""){
          _schema.push({
            name: schema[i].name,
            alias: schema[i].alias,
            element: schema[i].element,
            hidden: schema[i].hidden,
            isAdd: schema[i].isAdd,
            isPage: schema[i].isPage,
            label: schema[i].label,
            logo: schema[i].logo,
          })
        }
        for(let m in schema[i].schema){
          _schema.push(schema[i].schema[m])
        }
      }
    }else{
      _schema = schema;
    }
    this.state = {
      formData:{
        schema: _schema,
        changeData: function(i, item, value){
          self.props.events.trigger('formChange:'+item.name, i, item, value);
        }
      }
    };
  }

  componentWillMount(){
    // alert(1);
    let self = this;
    let schema = [];
    for(let i in self.state.formData.schema){
      switch(self.state.formData.schema[i].element){
        case "Input":
          schema[i] = self._input(self.state.formData.schema[i])
          if(self.state.formData.schema[i].parents && self.state.formData.schema[i].parents.length > 0 && self.state.formData.schema[i].url){
            for(let m in self.state.formData.schema[i].parents){
              self.props.events.on('formChange:'+self.state.formData.schema[i].parents[m], function(formData){
                let flag = true;
                let parms = {};
                for(let n in self.state.formData.schema[i].parents){
                  for(let x in formData){
                    if(formData[x].name == self.state.formData.schema[i].parents[n]){
                      if(formData[x].defaultValue == "" || formData[x].defaultValue == []){
                        flag = false;
                      }else{
                        parms[formData[x].name] = formData[x].defaultValue
                      }
                    }
                  }
                }
                self.fetchDataInput(parms, self.state.formData.schema[i]);
              });  
            }
          }else if(self.state.formData.schema[i].parents && self.state.formData.schema[i].parents.length > 0 && !self.state.formData.schema[i].url){
            
            for(let m in self.state.formData.schema[i].parents){
              self.props.events.on('formChange:'+self.state.formData.schema[i].parents[m], function(formData, schema, value){
                self.setValue(value, self.state.formData.schema[i]);  
              })
            }
            
          }

          break;
        case "Select":
          schema[i] = self._select(self.state.formData.schema[i])
          if(self.state.formData.schema[i].parents && self.state.formData.schema[i].parents.length > 0){
            for(let m in self.state.formData.schema[i].parents){
              self.props.events.on('formChange:'+self.state.formData.schema[i].parents[m], function(formData){
                let flag = true;
                let parms = {};
                for(let n in self.state.formData.schema[i].parents){
                  for(let x in formData){
                    if(formData[x].name == self.state.formData.schema[i].parents[n]){
                      if(formData[x].defaultValue == "" || formData[x].defaultValue == []){
                        flag = false;
                      }else{
                        parms[formData[x].name] = formData[x].defaultValue
                      }
                    }
                  }
                }
                self.fetchDataSelect(parms, self.state.formData.schema[i]);
              });  
            }
          }
          break;
        case "DatePicker":
          schema[i] = self._datePicker(self.state.formData.schema[i]);
          break;
        case "Checkbox":
          schema[i] = self._checkbox(self.state.formData.schema[i]);
          break;
        case "Radio":
          schema[i] = self._radio(self.state.formData.schema[i]);
          break;
        case "Switch":
          schema[i] = self._switch(self.state.formData.schema[i]);
          break;
        case "Textarea":
          schema[i] = self._textarea(self.state.formData.schema[i]);
          break;
        case "Refill":
          schema[i] = self._refill(self.state.formData.schema[i]);
          self.props.events.on('formChange:'+self.state.formData.schema[i].name+"_refill", function(formData, schema){
            self.fetchDataRefill(self.state.formData.schema[i], schema.defaultValue);
          })
          break;
        default:
          schema[i] = self.state.formData.schema[i];
          break;
      }
    } 
    self.state.formData.schema = schema;
    self.setState(self.state);   

  }

  setValue(value, schema){
    let self = this;
    for(let i in self.state.formData.schema){
      if(self.state.formData.schema[i].name == schema.name){
          self.state.formData.schema[i].defaultValue = value[schema.subKey.split('.')[1]]
      }
    }
    self.setState(self.state);

  }

  fetchDataRefill(schema, value){

    let self = this;
    async(self._parse(schema.url)).then(function(data){
      for(let i in self.state.formData.schema){
        if(self.state.formData.schema[i].name == schema.name){
            self.state.formData.schema[i].dataList = data.data.list;
        }
      }
      self.setState(self.state);
    })

  }


  fetchDataSelect(parms, schema){

    let self = this;
    async(self._parse(schema.url)).then(function(data){
      for(let i in self.state.formData.schema){
        if(self.state.formData.schema[i].name == schema.name){
          let options = [];
          for(let m in data.data.list){
            options.push({
              label:data.data.list[m].key,
              value:data.data.list[m].value
            });
          } 
          self.state.formData.schema[i].options = options;
        }
      }
      self.setState(self.state);
    })

  }

  fetchDataInput(parms, schema){
    let self = this;
    setTimeout(function(){
      async(self._parse(schema.url)).then(function(data){
        for(let i in self.state.formData.schema){
          if(self.state.formData.schema[i].name == schema.name){
            let setData = [];
            setData[schema.name] = data.data[self.state.formData.schema[i].subKey]
            self.state.formData.schema[i].defaultValue = data.data[self.state.formData.schema[i].subKey];
            self.state.formData.schema[i].attr = _.extend({value: data.data[self.state.formData.schema[i].subKey]}, self.state.formData.schema[i].attr);
            self.refs.formData.setFieldsValue(setData)
          }
        }
        self.setState(self.state);
      })
    })

  }

  _refill(item){
    
    let attrEle = [];
    let schema = {};
    let attr = {};
    for(var i in item){
      if(_.indexOf(attrEle, i) != -1){
        attr[i] = item[i];
      }else{
        schema[i] = item[i]
      }
    }
    schema.attr = attr;
    if(item.defaultValue == ""){
      schema.defaultValue = [];
    }

    let className = ["hidden"];
    if(item.hidden && item.hidden == 1){
      schema.className = schema.className+" hide";
    }

    return schema;

  }


  _checkbox(item){
    
    let attrEle = ["value", "disabled"];
    let schema = {};
    let attr = {};
    for(var i in item){
      if(_.indexOf(attrEle, i) != -1){
        attr[i] = item[i];
      }else{
        schema[i] = item[i]
      }
    }
    schema.attr = attr;
    if(item.defaultValue == ""){
      schema.defaultValue = [];
    }

    let className = ["hidden"];
    if(item.hidden && item.hidden == 1){
      schema.className = schema.className+" hide";
    }

    return schema;

  }

  _radio(item){
    
    let attrEle = ["value", "disabled"];
    let schema = {};
    let attr = {};
    for(var i in item){
      if(_.indexOf(attrEle, i) != -1){
        attr[i] = item[i];
      }else{
        schema[i] = item[i]
      }
    }
    schema.attr = attr;

    let className = ["hidden"];
    if(item.hidden && item.hidden == 1){
      schema.className = schema.className+" hide";
    }

    return schema;
  }

  _switch(item){
    let attrEle = ["value", "disabled"];
    let schema = {};
    let attr = {};
    for(var i in item){
      if(_.indexOf(attrEle, i) != -1){
        attr[i] = item[i];
      }else{
        schema[i] = item[i]
      }
    }
    schema.attr = attr;
    return schema;

  }


  _datePicker(item){
    let attrEle = ["disabled"];
    let className = ["hidden"];
    let schema = {};
    let attr = {};
    for(var i in item){
      if(_.indexOf(attrEle, i) != -1){
        attr[i] = item[i];
      }else{
        schema[i] = item[i]
      }
    }

    if(item.hidden && item.hidden == 1){
      schema.className = schema.className+" hide";
    }

    if(item.defaultValue === "0"){
      let now = Date.parse(new Date())/1000;
      let str = now+item.changeValue;
      schema.defaultValue = eval(str);
    }


    schema.attr = attr;
    schema.attr.format = (val) => val.format(item.format.replace("dd", "DD"));

    return schema;
  }

  _select(item){

    let attrEle = ["value", "placeholder", "disabled", "dropdownClassName", "cols"];
    let schema = {};
    let attr = {};
    for(var i in item){
      if(_.indexOf(attrEle, i) != -1){
        attr[i] = item[i];
      }else{
        schema[i] = item[i]
      }
    }
    schema.attr = attr;

    let className = ["hidden"];
    if(item.hidden && item.hidden == 1){
      schema.className = schema.className+" hide";
    }

    return schema;

  }

  //Input元素解析方法
  _textarea(item){
    
    let attrEle = ["value", "autoHeight", "placeholder", "disabled", "autosize", "rows"];
    let schema = {};
    let attr = {};
    for(var i in item){
      if(_.indexOf(attrEle, i) != -1){
        attr[i] = item[i];
      }else{
        schema[i] = item[i]
      }
    }
    schema.attr = attr;
    
    if(item.defaultValue && item.defaultValue != ""){
      schema.defaultValue = this._parse(item.defaultValue)
    }

    let className = ["hidden"];
    if(item.hidden && item.hidden == 1){
      schema.className = schema.className+" hide";
    }

    return schema;
  }

  //Input元素解析方法
  _input(item){
    
    let attrEle = ["value", "placeholder", "disabled"];
    let schema = {};
    let attr = {};
    for(var i in item){
      if(_.indexOf(attrEle, i) != -1){
        attr[i] = item[i];
      }else{
        schema[i] = item[i]
      }
    }
    schema.attr = attr;

    if(item.defaultValue && item.defaultValue != ""){
      schema.defaultValue = this._parse(item.defaultValue)
    }

    let className = ["hidden"];
    if(item.hidden && item.hidden == 1){
      schema.className = schema.className+" hide";
    }

    return schema;
  }


  //正则解析
  _parse(str){
    // 
    let self = this;
    let flag = true;
    let myReg = /\{(.*?)\}/g; 
    let res = str.match(myReg);
    
    for(let i in res){
      if(res[i].indexOf("jw.") != -1){
        str = str.replace(res[i], eval(res[i].replace("{", "").replace("}", "")));  
      }else{
        let values = self.refs.formData.getFieldsValue();
        if(values[res[i].replace("{", "").replace("}", "")] == "" || !values[res[i].replace("{", "").replace("}", "")]){
          flag = false;
        }else{
          str = str.replace(res[i], values[res[i].replace("{", "").replace("}", "")])  
        }
      }
    }
    if(flag){
      return str;  
    }else{
      return false;
    }
    
  }

  render(){

    return(
        <div className="form-show-title">
          <Form formData={this.state.formData} ref="formData"/>
        </div>
      )
  } 
  changeData(data){
    let dispatch = this.props.dispatch;
    dispatch({
      type:'form/changeData',
      data:{
        schema:data
      }
    })
  }
}
export default connect()(Schema);