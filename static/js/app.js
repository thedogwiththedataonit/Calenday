


// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});

/************************************* 
    VARIABLES
*************************************/

/* SOME MONTH LAYOUT VARIABLES */
var btnClose                        = $(".bt-calendar.monthly-view .calendar-table .days li .event-modal .modal-close");
var calendarModal                   = $(".bt-calendar.monthly-view .calendar-table .days li .event-modal");
var btnMoreEvents                   = $(".bt-calendar.monthly-view .calendar-table .days li a.more-events");
var dayItem                         = $(".bt-calendar.monthly-view .calendar-table ul.days li");

/* SOME WEEKLY LAYOUT VARIABLES */
var calendarWeekDay                 = $(".bt-calendar.weekly-layout .calendar-table ul.weekdays > li");
var calendarWeekDayCorresponding    = $(".bt-calendar.weekly-layout .calendar-table ul.days > li");



/* DON'T UNDERSTAND WHY THIS DO NOT WORK BUT WORKS ON RESIZE */
calendarWeekDay.click(function(){
    calendarWeekDay.removeClass("active");
    $(this).addClass("active");
    showActiveDay();
});


/************************************* 
    DAY EVENTS MODAL 
*************************************/

/* HIDE MODAL ON "x" CLICK*/
$(btnClose).click(function() {
  $(calendarModal).fadeOut();
});

/* SHOW MODAL ON "more" CLICK*/
$(btnMoreEvents).click(function() {
  $(calendarModal).fadeIn();
});


/************************************
  XS VIEW
  -- FOR SMALL SCREENS
  -- WIDTHS BELOW 400px 
************************************/

$(window).resize(function() {

    /*  WEEKLY LAYOUT CALENDAR 
        MEDIUM VIEW */
    if($(window).width() <= 1200) {
        $(".bt-calendar.weekly-layout").addClass("medium-view");
    }else{
        $(".bt-calendar.weekly-layout").removeClass("medium-view");
    }
  
  /*    MONTHLY VIEW CALENDAR 
        AND WEEKLY CALENDAR 
        XS VIEW */
  if($(window).width() <= 400) {
     $(".bt-calendar.monthly-layout").addClass("xs-view");
     $(".bt-calendar.weekly-layout").addClass("xs-view");
  }else{
    $(".bt-calendar.monthly-layout").removeClass("xs-view");
    $(".bt-calendar.weekly-layout").removeClass("xs-view");
  }

  /*    WEEKLY CALENDAR
        SMALL VIEW AND TABS EFFECT */

  // FOR WIDTHS BELOW 745px
  if($(window).width() <= 745) {

    $(".bt-calendar.weekly-layout").addClass("small-view");
    showActiveDay();
    
} else {
    // FOR WIDTHS ABOVE 745px
    calendarWeekDayCorresponding.show().removeClass("fullWidth");
    $(".bt-calendar.weekly-layout").removeClass("small-view");
}
});

function showActiveDay() {
     // FIND THE WEEKDAY LI DATA-ATRIBUTE WITH CLASS ACTIVE
  var activeWeekDay = $(".bt-calendar.weekly-layout .calendar-table ul.weekdays li.active").data('weekday');
    // FOR EACH DAY LI
    calendarWeekDayCorresponding.each(function(){
        // SEE IF THE DATA-ATRIBUTE MATCHES THE ONE FROM THE ACTIVE DAY
        if($(this).data('weekday') !== activeWeekDay ){
            // HIDE ALL LI THAT DOES NOT MATCH
            $(this).hide();
        } else {
            $(this).show();
            // EXPAND WIDTH OF THE LI THAT MATCHES
            $(this).addClass("fullWidth");
        }
    });
}

/************************************* 
            TOP MENU HIDERS NAV
*************************************/

$(document).ready(function(){
    $("#dashboard").click(function(){
        dashboard = document.getElementById("dashboard-content");
        dashboard.style.display = "grid";

        calendar = document.getElementById("calendar-content");
        calendar.style.display = "none";
        friends = document.getElementById("friends-content");
        friends.style.display = "none";
        support = document.getElementById("support-content");
        support.style.display = "none";

    });
}
);
$(document).ready(function(){
    $("#calendar").click(function(){
        //change id="calendar_content" to display:block
        calendar = document.getElementById("calendar-content");
        calendar.style.display = "block";

        friends = document.getElementById("friends-content");
        friends.style.display = "none";
        support = document.getElementById("support-content");
        support.style.display = "none";
        dashboard = document.getElementById("dashboard-content");
        dashboard.style.display = "none";
    });
}
);
$(document).ready(function(){
    $("#friends").click(function(){
        //change id="friends_content" to display:block
        friends = document.getElementById("friends-content");
        friends.style.display = "block";

        calendar = document.getElementById("calendar-content");
        calendar.style.display = "none";
        support = document.getElementById("support-content");
        support.style.display = "none";
        dashboard = document.getElementById("dashboard-content");
        dashboard.style.display = "none";
    });
}
);
$(document).ready(function(){
    $("#support").click(function(){
        //change id="support_content" to display:block
        support = document.getElementById("support-content");
        support.style.display = "block";

        calendar = document.getElementById("calendar-content");
        calendar.style.display = "none";
        friends = document.getElementById("friends-content");
        friends.style.display = "none";
        dashboard = document.getElementById("dashboard-content");
        dashboard.style.display = "none";
    });
}
);

/************************************* 
        DASHBOARD PANEL NAV HIDERS
*************************************/
$(document).ready(function(){
    $("#notes").click(function(){
        //change id="support_content" to display:block
        support = document.getElementById("taskscolumn");
        support.style.display = "none";
        
    });
}
);
$(document).ready(function(){
    $("#tasks").click(function(){
        //change id="support_content" to display:block
        support = document.getElementById("taskscolumn");
        support.style.display = "flex";
        
    });
}
);

const navTabs = document.querySelectorAll("#nav-tabs > a");
navTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    navTabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
  });
});


/************************************* 
        Calendar Functions
*************************************/

function query_next(username) {
    $('#days').load('/emptycalendar.html');
    var date = document.getElementById("hiddenweekcurrent").innerHTML;
    var today = new Date(date);
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
    var lastDayOfMonth = lastDayOfMonth.toString().split(' ');
    var lastDayOfMonth = parseInt(lastDayOfMonth[2]);
    var date_split = date.split("-");
    var month = parseInt(date_split[0]);
    var static_month = month;
    var day = parseInt(date_split[1]);
    var year = parseInt(date_split[2]);
    var list_of_next_week = [day+7, day+8, day+9, day+10, day+11, day+12, day+13];

    for (var i = 0; i < list_of_next_week.length; i++) {
        if (list_of_next_week[i] == lastDayOfMonth + 1) {
            list_of_next_week[i] = 1;
        }
        if (list_of_next_week[i] > lastDayOfMonth) {
            difference = Math.abs(list_of_next_week[i] - lastDayOfMonth);
            list_of_next_week[i] = difference;
        }
    }

    if (list_of_next_week.includes(7)) {
        var month = month + 1;
        if (month == 13) {
            month = 1;
            year = year + 1;
        }
        var current_week = month.toString() + "-" + list_of_next_week[0].toString() + "-" + year.toString();
    }
    else {
            var current_week = static_month.toString() + "-" + list_of_next_week[0].toString() + "-" + year.toString();
            month = static_month;
        }
        
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var week_list = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    calendar_month = document.getElementById("month");
    calendar_month.innerHTML = months[month-1].toString() + " " + year.toString();
    document.getElementById("hiddenweekcurrent").innerHTML = current_week;
    weekdaysul = document.getElementById("weekdaysul");
    weekdaysul.innerHTML = "";
    
    for(i = 0; i < 7; i++){
        weekdaysul.innerHTML += `<li id="${week_list[i]}" class="" data-weekday="${week_list[i]}"><span class="week-day-item">${week_list[i]}</span><span class="day-item">${list_of_next_week[i]}</span></li>`;
    }
    
    fetch(`/api/calendar/${username}/${current_week}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        if (data == false) {
            return;
        }
        else {
            for(i = 0; i < data.length; i++){

                time = data[i].time;
                key = time+"-"+data[i].day_name;
                console.log(key);
                //find li with id=key and add the event to it
                li = document.getElementById(key);
                li.innerHTML = `<div class="single-event"><span class="event-title">${data[i].title}</span></div>`;
            }
        }
    })

    setTimeout(function(){
		//set loader display to flex for 5 seconds
		$(loader).css("display", "flex");
		//set the loader to display none after 5 seconds
		setTimeout(function(){
			$(loader).css("display", "none");
		}
		, 1800);
	});
}

function query_prev(username) {
    $('#days').load('/emptycalendar.html');
    var date = document.getElementById("hiddenweekcurrent").innerHTML;
    var date_split = date.split("-");
    var month = parseInt(date_split[0]);
    var static_month = month;
    var day = parseInt(date_split[1]);
    var year = parseInt(date_split[2]);
    var check = day - 7;

    if (check <= 0) {
        month = month - 1;
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        var check_date = new Date(year, month, 0);
        var lastDayOfMonth = new Date(check_date.getFullYear(), check_date.getMonth()+1, 0);
        var lastDayOfMonth = lastDayOfMonth.toString().split(' ');
        var lastDayOfPrevMonth = parseInt(lastDayOfMonth[2]);

        list_of_prev_week = [lastDayOfPrevMonth + check, lastDayOfPrevMonth + check + 1, lastDayOfPrevMonth + check + 2, lastDayOfPrevMonth + check + 3, lastDayOfPrevMonth + check + 4, lastDayOfPrevMonth + check + 5, lastDayOfPrevMonth + check + 6];
        for (var i = 0; i < list_of_prev_week.length; i++) {
            if (list_of_prev_week[i] > lastDayOfPrevMonth) {
                list_of_prev_week[i] = list_of_prev_week[i] - lastDayOfPrevMonth;
            }
        }
    }
    else {
        list_of_prev_week = [day - 7, day - 6, day - 5, day - 4, day - 3, day - 2, day - 1];
    }

    var current_week = month.toString() + "-" + list_of_prev_week[0].toString() + "-" + year.toString();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var week_list = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    calendar_month = document.getElementById("month");
    calendar_month.innerHTML = months[month-1].toString() + " " + year.toString();
    document.getElementById("hiddenweekcurrent").innerHTML = current_week;
    weekdaysul = document.getElementById("weekdaysul");
    weekdaysul.innerHTML = "";
    
    for(i = 0; i < 7; i++){
        weekdaysul.innerHTML += `<li id="${week_list[i]}" class="" data-weekday="${week_list[i]}"><span class="week-day-item">${week_list[i]}</span><span class="day-item">${list_of_prev_week[i]}</span></li>`;
    }

    fetch(`/api/calendar/${username}/${current_week}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        if (data == false) {
            return;
        }
        else {
            for(i = 0; i < data.length; i++){

                time = data[i].time;
                key = time+"-"+data[i].day_name;
                console.log(key);
                //find li with id=key and add the event to it
                li = document.getElementById(key);
                li.innerHTML = `<div class="single-event"><span class="event-title">${data[i].title}</span></div>`;
            }
        }
    })

    setTimeout(function(){
		//set loader display to flex for 5 seconds
		$(loader).css("display", "flex");
		//set the loader to display none after 5 seconds
		setTimeout(function(){
			$(loader).css("display", "none");
		}
		, 1800);
	});
}


function addNewEvent() {
    document.getElementById('addView').style.display = "flex";
}

function addEventSubmit(username) { //if am? alert false // THIS IS SCRIPT TAG INSERTED
    //grab the values from title, datepick, and timepick
    title = document.getElementById("title").value;
    //desc = document.getElementById("desc").value;
    date = document.getElementById("datepick").value;
    time = document.getElementById("timepick").value;
    duration = document.getElementById("duration").value;
    currentweek = document.getElementById("hiddenweekcurrent").innerHTML;
    importance = document.getElementById("importance").value;
    desc = document.getElementById("desc").value;
    console.log(currentweek)
    console.log(title);
    console.log(date);
    console.log(time);
    console.log(duration);
    console.log(currentweek);
    console.log(importance);
    console.log(desc);
    if(title == "" || date == "" || time == "" || duration == ""){
        alert("Make sure to include the tite, time, date, and duration of the event");
        return
    }


    currentweek = currentweek.split("-");
    currentmonth = currentweek[0]
    currentday = currentweek[1]
    currentyear = currentweek[2]

    selectedweek = date.split("-");
    selectedmonth = selectedweek[1]
    selectedday = parseInt(selectedweek[2])
    selectedyear = selectedweek[0]

    check = parseInt(currentday)+6;//account for the end of the month!!!
    console.log(check)
    //turn currentday into an int
    db_date = selectedmonth + "-" + selectedday + "-" + selectedyear;

    list_of_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    date = new Date(selectedmonth + "-" + selectedday + "-" + selectedyear);
    let day = date.getDay()
    day_name = list_of_days[day];
    console.log(day_name);

    if(selectedmonth == currentmonth && selectedyear == currentyear && selectedday <= check){
        //add to current calendar
        time = (convert(time));
        time = time.split(":");
        //remove first three indexes of time[1]
        time[1] = time[1].substring(3);
        time = time[0] + time[1];
 
        key = time + "-" + day_name;
        console.log(key);
        li = document.getElementById(key);
        li.innerHTML = `<div class="single-event"><span class="event-title">${title}</span></div>`;

    }

    const data = { username: username,
                   title: title,
                   date: db_date,  
                   time: time,
                   duration: duration,
                   importance: importance,
                   desc:desc,
                   day_name: day_name,
                   //currentweek: currentweek, #done serverside to account for non current weeks

                 };

    fetch('/api/createcalendar', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });

    //change the view back to the calendar
    document.getElementById('addView').style.display = "none";
    return
}

function back() {
    //change the display of "purchase_box" to none
    document.getElementById('addView').style.display = "none";
    return
    
}

function convert(input) {
    return moment(input, 'HH:mm').format('h:mm A');
}

async function pageLoadCalendarData(weekID, username) { //make faster
    console.log(weekID);
    console.log(username);

    fetch(`/api/getcalendar/${username}/${weekID}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //console.log(data[0].date);
        // for i in range(len(data)):
        //     print(data[i].date)
        for(i = 0; i < data.length; i++){
            //turn military time into standard time
            
            time = data[i].time;
            
            //asdd

            key = time+"-"+data[i].day_name;
            console.log(key);
            //find li with id=key and add the event to it
            li = document.getElementById(key);
            li.innerHTML = `<div class="single-event"><span class="event-title">${data[i].title}</span></div>`;
        }


    });
    setTimeout(function(){
		//set loader display to flex for 5 seconds
		$(loader).css("display", "flex");
		//set the loader to display none after 5 seconds
		setTimeout(function(){
			$(loader).css("display", "none");
		}
		, 1800);
	});
}