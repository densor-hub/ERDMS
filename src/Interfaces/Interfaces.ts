import { CSSProperties, ChangeEventHandler, MutableRefObject } from "react";

export interface iAddPerson {
  formDataSetterFunctions?: Array<Function>;
  navigation?: any;
  content?: Array<iAddPersonContentObject>;
}

export interface iAddPersonContentObject {
  title?: string;
  navigation?: iNavigation;
  setformData?: Function;
  formData: Array<iFormDataObject>;
}

export interface iMenucontentContainer {
  id: string;
  content: iMenucontentObject[];
}

export interface iMenucontentObject {
  title?: string;
  children?: Array<iMenucontenChildrenObject>;
}

export interface iMenucontenChildrenObject {
  title: string;
}

export interface iStyles {
  fieldset?: CSSProperties;
  input?: CSSProperties;
  label?: CSSProperties;
  button?: CSSProperties;
  phoneNumber?: CSSProperties;
  form?: CSSProperties;
  row?: CSSProperties;
}

export interface iNavigation {
  previous?: string;
  next?: string;
  default?: string;
}

export interface iFormDataInput {
  type: string;
  required: boolean;
  autoComplete: string;
  icon?: React.FC<any>;
  allowedExtensions?: Array<string>;
  placeholder?: string;
}

export interface iFormType {
  regular: boolean;
}

export interface iFormDataObject {
  label: string;
  data: any;
  input: iFormDataInput;
  validator?: Function;
  children?: Array<any>;
}

export interface iPhoneNumber {
  phoneNumberData: iFormDataObject;
  REF: any;
  Styles: iStyles;
}

export interface iUploadFileDataObject {
  label: string;
  data: HTMLImageElement | null;
  input: iFormDataInput;
}

export interface iForwardedByFileUploader {
  setFile: Function;
  uploadFileInputRef: HTMLInputElement | null;
}

export interface iSelectChildObject extends Object {
  _id?: string | number;
  id?: string | number;
  name: string | number;
  type: string | number;
  size: string | number;
}

export interface iForwardedByPasswordInput {
  setPassword: Function;
}

export interface iForwardedBySelect {
  setSelectedValue: Function;
}

export interface iForwaredByRadio {
  setRadioValue: Function;
}

export interface iForwaredByPhoneInput {
  setPhoneInputValue: Function;
}

export interface iFormSubComponent {
  formDataObject: iFormDataObject;
  ref?: any;
  REF?: any;
  Styles?: iStyles;
  inputRefs?: MutableRefObject<Array<HTMLInputElement>>;
}

export interface iForm {
  formTitle?: String;
  //string that represenst the title of the form

  formType?: iFormType;

  formData: Array<iFormDataObject>;
  //array of objects {
  //#label -[id, name, label, pathnameLastItem],
  // #data-[empty string],
  // #input-[required props - *required *type ] ,
  //#validCondintion - function that takes a parameter, the parameter will reprensent the data in the input- hence the function should cover all necessary validations needed to validate the value in the input
  // }

  setformData: Function;
  //the setter fuction of the state formData

  formDataSetterFunctions?: Array<Function>;
  //Only  needed when there are multiple instances of the form, purposely for setting all the data entered to blank when operation is cancelled

  navigation?: iNavigation;
  //for navigation - if there is no navigation from one form to the other, dont provide this
  //object- {next:'string', previous:'string'}
  //if thers no other form instance to be rendered on next,  dont provide next
  //if thers no other form instance to be rendered on previous,  dont provide previous
  //CONTENT is only needed when there are multiple instances of this form in your component and the said instances are moved from one to the other based on next and previous consitions

  setCurrentContent?: Function;
  //the setter fuction of the state currentContent (string) which is used to conditionally form based on the next or previous
  //for setting current content dispayed in the form based on the next and previous provided in CONTENT

  Styles?: iStyles;
  //for styling the form incase default style is not preffered
  onCancel: Function;
  //customised cancel Function from developer
  onSubmit: Function;
  //customised submit Function from developer;
}
