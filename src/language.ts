import { ObjectIndex } from "./ObjectIndex";

let Language:ObjectIndex = {
	"English"  : "en",
	"Brazilian": "pt_BR",
	"Chinese"  : "zh",
	"French"   : "fr",
	"German"   : "de",
	"Japanese" : "ja",
	"Romanian" : "ro",
	"Russian"  : "ru",
	"Spanish"  : "es",
	"Turkish"  : "tr"
};

//返回语言类型
export default (value:any)=>{
	return Language[value];
}