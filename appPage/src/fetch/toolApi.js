export function gd(AddDayCount) {   
   var dd = new Date();  
   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
   var y = dd.getFullYear();   
   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
   return y+"-"+m+"-"+d;   
} 

export function cd(startDate, endDate) {
    var arrStart = startDate.split("-");
    var startTime = new Date(arrStart[0], arrStart[1], arrStart[2]);
    var startTimes = startTime.getTime();
    var arrEnd = endDate.split("-");
    var endTime = new Date(arrEnd[0], arrEnd[1], arrEnd[2]);
    var endTimes = endTime.getTime();
    if (endTimes<startTimes) {
        return false;
    }
    return true;
}