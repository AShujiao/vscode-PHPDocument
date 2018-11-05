import languageConf from './language';
import { ObjectIndex } from "./ObjectIndex";

//php流程控制关键字 - control-structures
const structuresArr:ObjectIndex = {
	"if" : "if",
	"else" : "else",
	"elseif" : "elseif",
	"while" : "while",
	"do" : "do.while",
	"for" : "for",
	"foreach" : "foreach",
	"break" : "break",
	"continue" : "continue",
	"switch" : "switch",
	"declare" : "declare",
};

//oop关键字 - language.oop5
const oopArr:ObjectIndex = {
	"class" : "basic",
	"$this" : "basic",
	"new" : "basic",
	"const" : "constants",
	"--construct" : "decon",
	"public" : "visibility",
	"protected" : "visibility",
	"private" : "visibility",
	"extends" : "inheritance",
	"::" : "paamayim-nekudotayim",
	"static" : "static",
	"abstract" : "abstract",
	"interfaces" : "interfaces",
	"trait" : "trait",
	"anonymous" : "anonymous",
	"--set" : "overloading",
	"--get" : "overloading",
	"--isset" : "overloading",
	"--unset" : "overloading",
	"final" : "final",
	"--clone" : "cloning",
};

//命名空间相关 - language.namespaces
const namespaceArr:ObjectIndex = {
	"use" : "importing",
	"namespace" : "rationale",
}

//变量类型 - language.types
const typeArr:ObjectIndex = {
	"true" : "boolean",
	"false" : "boolean",
	"int" : "integer",
	"null" : "null",
	"object" : "object",
	"float" : "float",
	"double" : "float",
	"real" : "float",
};

//全局变量关键字 - reserved.variables
const globalsArr:ObjectIndex = {
	"$GLOBALS" : "globals",
	"$-SERVER" : "server",
	"$-GET" : "get",
	"$-POST" : "post",
	"$-FILES" : "files",
	"$-REQUEST" : "request",
	"$-SESSION" : "session",
	"$-ENV" : "environment",
	"$-COOKIE" : "cookies",
	"$php_errormsg" : "phperrormsg",
	"$HTTP-RAW-POST-DATA" : "httprawpostdata",
	"$http-response-header" : "httpresponseheader",
	"$argc" : "argc",
	"$argv" : "argv",
};

export default (lan:string,func:string):string => {
	//获取文档语言类型
	let config_language:string = languageConf(lan);
	//关键字类型
	let func_type:string = "function";//默认为函数
	//检查是否为php流程控制关键字
	let isStructrues:boolean = structuresArr[func] ? true:false;
	//判断关键字类型
	if(isStructrues){
		return getUrl(config_language,structuresArr[func],"control-structures");
	}

	//检查是否为oop关键字
	let isOOP:boolean = oopArr[func] ? true:false;
	if(isOOP){
		return getUrl(config_language,oopArr[func],"language.oop5");
	}

	//检查是否为全局变量关键字
	let isGlobals = globalsArr[func] ? true:false;
	if(isGlobals){
		return getUrl(config_language,globalsArr[func],"reserved.variables");
	}

	//检查是否为命名空间关键字
	let isNamespace:boolean = namespaceArr[func] ? true:false;
	if(isNamespace){
		return getUrl(config_language,namespaceArr[func],"language.namespaces");
	}

	//检查是否为变量类型关键字
	let isTypes = typeArr[func] ? true:false;
	if(isTypes){
		return getUrl(config_language,typeArr[func],"language.types");
	}

	//返回默认为函数
	return getUrl(config_language,func,func_type);
	
}

//获取php文档url
function getUrl(language:string,func:string,func_type:string):string{

	return `https://php.net/manual/${language}/${func_type}.${func}.php`;

}