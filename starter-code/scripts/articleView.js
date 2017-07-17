'use strict';

var articleView = {};
var tempRay = [];

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};
//testing
articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      }, 200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

articleView.initNewArticlePage = function() {
  // DONE: Make the tabs work. Right now, you're seeing all the tab content (items with a class of tab-content) on the page at once. The section with the id of "write" should show when the "write" tab is clicked; it is also the default and should be shown on page load. The section with the id of "articles" should show when the "preview" tab is clicked.
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

// TODONE: Hide the article-export section on page load
$('#article-export').hide();
$('#article-json').on('focus', function() {
  this.select();
});

// TODO: Add an event handler to update the preview and the article-export field if any inputs change.
articleView.showPreview = function() {
  $('#article-export').empty();

  var existingArticle = new Article({
    title: $('#entryTitle').val(),
    category: $('#entryCategory').val(),
    author: $('#entryAuthor').val(),
    authorUrl: $('#entryAuthorURL').val(),
    date: (new Date()).toDateString(),
    body: $('#entryBody').val(),
  });

  console.log(existingArticle);
  tempRay.push(existingArticle);
  console.log(tempRay);
  // return existingArticle;

  // articleView.newEntry.title = $('#entryTitle').val();
  // articleView.newEntry.date = (new Date()).toDateString();
  // articleView.newEntry.category = $('#entryCategory').val();
  // articleView.newEntry.mood = $('#entryAuthorURL').val();
  // articleView.newEntry.text = $('#entryText').val();
  // articleView.newEntry.author = $('#entryAuthor').val();
  // articleView.newEntry.templateAndDomify('#article-export');
};


// this is the function that generates the preview and shows the export field
articleView.create = function() {
  // TODO: Set up a var to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
  var template = $('#articleTemplate').html();

  // TODO: Instantiate an article based on what's in the form fields:
  var compiled = Handlebars.compile(template);

  // TODO: Use our interface to the Handblebars template to put the article preview into the DOM:
  $('#articles').append(compiled(this));

  // TODO: The new articles we create will be shown as JSON in an element in our article-export section. From there, we can copy/paste the JSON into our source data file.
  // Set up this "export" functionality. When data is inputted into the form, that data should be converted to stringified JSON. Then, display that JSON in the element inside the article-export section. The article-export section was hidden on page load; make sure to show it as soon as data is entered in the form.

  var x = JSON.stringify(tempRay);
  console.log(x);
  var y = JSON.parse(x);
  console.log(y);


};

$('#save').on('click', function() {
  event.preventDefault();
  articleView.showPreview();
  // $('#article-export').append(tempRay)

  tempRay.forEach(function(article){
    $('#article-export').append(article.toHtml())
    $('#article-export').show();
  });


})


articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
  articleView.showPreview();
  articleView.create();
};
