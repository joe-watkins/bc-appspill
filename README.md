# Introducing bc-AppSpill.js
A jQuery plugin for outputting more than 500 web app items to a page at once within Adobe Business Catalyst. You can even run a callback function after that if you'd like to manipulate this data.

The way this works is the plugin looks for BC's pagination which starts after 500 web app items and grabs content from all those pages with Ajax. The plugin will then output all those items to the page and show the target container. 

If you have defined a callback as a plugin option it will run that and then show the target container to the user. See below.

Visit the [demo page](http://bit.ly/1iX7FXH) Here we are outputting over 500 Web App items and then running a callback function that simply adds a class to each web app item.

## Basic Usage - How Do I Use It?
Create a target container element and output your Web App items. You will also want to add a class to this target so that Ajax has a target to work with.

```html
 <div class="bc-output-all ajax-target">
	{module_webapps,21691,a}
 </div>
```

Hide the parent container and pagination.
```css
 .bc-output-all {display:none;}
 .bc-output-all .pagination.webapp { display:none; }
```

Include jQuery 1.10+ &amp; bc-appspill.min.js

```html
 <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
 <script src="javascript/bc-appspill.min.js"></script>
 <script>
    $('.bc-output-all').bcAppSpill();
 </script>
```

### With a callback function
This is handy for when you want a bunch of items on a page and then you want to use another plugin to manipulate that data eg. jQuery driven calendar feature.

```javascript

// example callback function
// adds a class of 'meow' to all the items
// after they have all loaded
 function _manipulateItems(target){
  $(target).find('div').each(function(){
	 $(this).addClass('meow');
  }); 
 }

 $('.bc-output-all').bcAppSpill({
  callBack: function(){
	 _manipulateItems('.bc-output-all'); // run this function after
  }
 });

```

### Options
Below you will find some simple options to define:

```javascript
$('.bc-output-all').bcAppSpill({
  ajaxTarget: 'ajax-target', // a handle for ajax
  bcPagClass: 'pagination.webapp', // BC's default pagination <ul>
  bcPaginationNext: 'li.pag-next', // BC's default pagination next link 
  callBack: function(){
   _manipulateItems('.bc-output-all'); // run this function afterwards
 }
});
```

### Bonus Material
Throw the function below into your console window to create a bunch of web app items for a spreadsheet import file. Copy the contents of the console window, paste it into a text editor then find/replace any unwanted text.

```javascript

function drawItems(){
  for(x = 0; x < 2000; x++){
	  var s = x+',Item Name,"",14-Mar-2014,01-Jan-9999,,-1,Y,-1,,,,,,,'
	  console.log(s);
  }
}

drawItems();

```


## Changelog
* _03.17.14 - v1.0.0 - 866bytes_ minified
	* Initial release

## Credits
@_josephwatkins