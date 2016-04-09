"use strict";

// BIO JSON 

var bio = {
	"name" : "Andy Hang",
	"role" : "Front-end Web Developer",
	"contacts" : {
		"mobile" : "773-414-8679",
		"email" : "hang.andy.t@gmail.com",
		"github" : "https://github.com/dashaman",
		"twitter" : "N/A",
		"linkedin" : "https://www.linkedin.com/in/andy-hang-492057102",
		"location" : "Chicago, IL"
	},
	"welcomeMessage" : "Hello! My name is Andy Hang and I am currently a freelance web developer living in Chicago.",
	"skills" : ["HTML", "CSS", "Javascript", "Responsive design"],
	"biopic" : "img/profile.jpg",
	"display" : function() {
		// name & role
		$('#header').prepend(HTMLheaderRole.replace("%data%", bio.role));
		$('#header').prepend(HTMLheaderName.replace("%data%", bio.name));

		// contact info
		$('#topContacts, #footerContacts').append(HTMLmobile.replace("%data%", bio.contacts.mobile));
		$('#topContacts, #footerContacts').append(HTMLemail.replace("%data%", bio.contacts.email));
		$('#topContacts, #footerContacts').append(HTMLgithub.replace("%data%", bio.contacts.github));
		$('#topContacts, #footerContacts').append(HTMLtwitter.replace("%data%", bio.contacts.twitter));
		$('#topContacts, #footerContacts').append(HTMLlocation.replace("%data%", bio.contacts.location));

		// biopic & welcome message
		$('#header').append(HTMLbioPic.replace("%data%", bio.biopic));
		$('#header').append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));

		// loop through skills
		$('#header').append(HTMLskillsStart);
		for (var i=0; i<bio.skills.length; i++){
			$('#skills').append(HTMLskills.replace("%data%",bio.skills[i]));
		}
	}
};


// EDU JSON

var education = {
	"schools" : [
	{
		"name" : "Loyola University Chicago",
		"location" : "Chicago, IL",
		"degree" : "",
		"majors" : [],
		"concentrations" : [],
		"dates" : 2015,
		"url" : ""
	}
	],
	"onlineCourses" :[
	{
		"title" : 'Front-End Web Developer Nanodegree',
		"school" : 'Udacity',
		"date" : 2016,
		"url" : 'https://www.udacity.com/course/nd001'
	}
	],
	"display" : function() {
		for (var i=0; i<education.schools.length; i++){
			// school information
			$('#education').append(HTMLschoolStart);
			$('.education-entry:last').append(HTMLschoolName.replace("%data%", education.schools[i].name) + HTMLschoolDegree.replace("%data%", education.schools[i].degree));
			$('.education-entry:last').append(HTMLschoolDates.replace("%data%", education.schools[i].dates));
			$('.education-entry:last').append(HTMLschoolLocation.replace("%data%", education.schools[i].location));

			// loop through majors
			for (var j=0; j<education.schools[i].majors.length; j++){
				$('.education-entry:last').append(HTMLschoolMajor.replace("%data%", education.schools[i].majors[j]));
			}

			// loop through concentrations
			var concentrations = '';
			for (var k=0; k<education.schools[i].concentrations.length; k++){
				if (k !== 0){
					concentrations+= ', ';
				}
				concentrations+= education.schools[i].concentrations[k];
			}

			// display concentrations
			if (concentrations !== ''){
				$('.education-entry:last').append(HTMLschoolConcentration.replace("%data%", concentrations));
			}
		}

		// online course information
		$('#education').append(HTMLonlineClasses);
		for (i=0; i<education.onlineCourses.length; i++){
			$('#education').append(HTMLschoolStart);
			$('.education-entry:last').append(HTMLonlineTitle.replace("%data%", education.onlineCourses[i].title) + HTMLonlineSchool.replace("%data%", education.onlineCourses[i].school));
			$('.education-entry:last').append(HTMLonlineDates.replace("%data%", education.onlineCourses[i].date));
			$('.education-entry:last').append(HTMLonlineURL.replace("%data%", education.onlineCourses[i].url));
		}
	}
};


// Work JSON

var work = {
	jobs: [
		{
			"employer" : "Best Case, LLC",
			"title" : "Technical Support Specialist",
			"location" : "Evanston, IL",
			"dates" : "2013 - Present",
			"description" : ""
		},
		{
			"employer" : "Walgreens",
			"title" : "Certified Pharmacy Technician",
			"location" : "Chicago, IL",
			"dates" : "July 2008 - May 2013",
			"description" : ""
		},
		{
			"employer" : "Pierce & Associates",
			"title" : "Jusdgment Affidavits Clerk",
			"location" : "Chicago IL",
			"dates" : "October 2012 - December 2012",
			"description" : ""
		}
	],
	"display" : function() {
		for (var i=0; i<work.jobs.length; i++){
			// job information
			$('#workExperience').append(HTMLworkStart);
			$('.work-entry:last').append(HTMLworkEmployer.replace("%data%",work.jobs[i].employer) + HTMLworkTitle.replace("%data%",work.jobs[i].title));
			$('.work-entry:last').append(HTMLworkDates.replace("%data%",work.jobs[i].dates));
			$('.work-entry:last').append(HTMLworkLocation.replace("%data%",work.jobs[i].location));
			$('.work-entry:last').append(HTMLworkDescription.replace("%data%",work.jobs[i].description));
		}
	}
};


// Project JSON 

var projects = {
	"projects" : [
		{
				"title" : "Project 1 - Online Portfolio",
				"dates" : "Feb 2016",
				"description" : "Developed a responsive website that display images, descriptions and links <p><b>Skills: HTML, CSS and Responsive Design</p></b>",
				"images" : ["img/ProjOne.png"],

		},
		{
				"title" : "Project 2 - Interactive Resume",
				"dates" : "April 2016",
				"description" : "The page you are currently on is my interactive resume! <p><b>Skills: HTML, CSS, Javascript, jQuery</p></b>",
				"images" : ["img/ProjTwo.png"],			
		}
	],
	"display" : function() {
		for (var i=0; i<projects.projects.length; i++){
			// project information
			$('#projects').append(HTMLprojectStart);
			$('.project-entry:last').append(HTMLprojectTitle.replace("%data%", projects.projects[i].title));
			$('.project-entry:last').append(HTMLprojectDates.replace("%data%", projects.projects[i].dates));
			$('.project-entry:last').append(HTMLprojectDescription.replace("%data%", projects.projects[i].description));

			// project images
			for (var j=0; j<projects.projects[i].images.length; j++){
				$('.project-entry:last').append(HTMLprojectImage.replace("%data%", projects.projects[i].images[j]));
			}
		}
	}	
};


// Display
var resume = {
	init: function(){
		// display sections
		bio.display();
		work.display();
		projects.display();
		education.display();

		// display maps
		$('#mapDiv').append(googleMap);
		initializeMap();
	}
};


resume.init();

