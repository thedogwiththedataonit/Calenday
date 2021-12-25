


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
    //grab the inner html of 
    //fetch api
    date = document.getElementById("hiddenweekcurrent").innerHTML;
    fetch(`/api/calendar/${username}/${date}/next`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //replace id=month with data.month and month.year
        month = document.getElementById("month");
        month.innerHTML = data.month + " " + data.year;
        //replace the innerhtml of id="hiddenweekcurrent"
        document.getElementById("hiddenweekcurrent").innerHTML = data.current_week;

        weekdaysul = document.getElementById("weekdaysul");
        weekdaysul.innerHTML = "";
        //loop through the weekdays and append them to the weekdaysul
        for(i = 0; i < 7; i++){
            weekdaysul.innerHTML += `<li id="${data.week_list[i]}" class="" data-weekday="${data.week_list[i]}"><span class="week-day-item">${data.week_list[i]}</span><span class="day-item">${data.week_num_dates[i]}</span></li>`;
        }
    }
    );
}

function query_prev(username) {
    //fetch api
    date = document.getElementById("hiddenweekcurrent").innerHTML;
    fetch(`/api/calendar/${username}/${date}/prev`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //replace id=month with data.month and month.year
        month = document.getElementById("month");
        month.innerHTML = data.month + " " + data.year;
        //replace the innerhtml of id="hiddenweekcurrent"
        document.getElementById("hiddenweekcurrent").innerHTML = data.current_week;

        weekdaysul = document.getElementById("weekdaysul");
        weekdaysul.innerHTML = "";
        //loop through the weekdays and append them to the weekdaysul
        for(i = 0; i < 7; i++){
            weekdaysul.innerHTML += `<li id="${data.week_list[i]}" class="" data-weekday="${data.week_list[i]}"><span class="week-day-item">${data.week_list[i]}</span><span class="day-item">${data.week_num_dates[i]}</span></li>`;
        }
    }
    );
}


function addNewEvent() {
    document.getElementById('addView').style.display = "flex";
}

function addEventSubmit(username) {
    //grab the values from title, datepick, and timepick
    title = document.getElementById("title").value;
    //desc = document.getElementById("desc").value;
    date = document.getElementById("datepick").value;
    time = document.getElementById("timepick").value;

    console.log(title);
    console.log(date);
    console.log(time);

    const data = { username: username,
                   title: title,
                   date: date,  
                   time: time,
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
}

function back() {
    //change the display of "purchase_box" to none
    document.getElementById('addView').style.display = "none";
    
}

function convert(input) {
    return moment(input, 'HH:mm').format('h:mm A');
}

async function pageLoadCalendarData(weekID, username) {
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
            
            time = (convert(data[i].time));
            //split time by ":"
            time = time.split(":");
            //remove first three indexes of time[1]
            time[1] = time[1].substring(3);
            time = time[0] + time[1];


            key = time+"-"+data[i].day_name;
            console.log(key);
            //find li with id=key and add the event to it
            li = document.getElementById(key);
            li.innerHTML += `<div class="single-event"><span class="event-title">${data[i].title}</span></div>`;


            
        }


    });
    
}