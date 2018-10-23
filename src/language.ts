
interface LanguageIndex{
	//定义索引key为string类型，索引值为string类型
	[index:string]:string
}

let Language:LanguageIndex = {
	"English" : "en",
	"Brazilian" : "pt_BR",
	"Chinese" : "zh",
	"French" : "fr",
	"German" : "de",
	"Japanese" : "ja",
	"Romanian" : "ro",
	"Russian" : "ru",
	"Spanish" : "es",
	"Turkish" : "tr"
};

export default (value:any)=>{
	return Language[value];
}