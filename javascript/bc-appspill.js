/*!
	* bcAppSpill
	* Author: Joe Watkins - joe-watkins.io
	* Licensed under the MIT license
	*
	*/
	(function($){
	 
	    $.fn.bcAppSpill = function(options) {

	        var defaults = {
	          wrapper:          	this,
	          ajaxTarget: 				'ajax-target',
	          bcPagClass: 				'pagination.webapp',
	          bcPaginationNext: 	'li.pag-next',
	          callBack: 					null
	        }
	            
	        var options =  $.extend(defaults, options);
	        var o = options;

	        var $parent = o.wrapper,
							ajaxHandleClass = o.ajaxTarget,
							$pagination = $parent.find('.'+o.bcPagClass+':last'),
							paginationCount = $pagination.length,
							bcPaginationNext = o.bcPaginationNext,ajaxCount = 0;

							// check to see if there is even pagination
							// if there is go for it..
							if(paginationCount !== 0 && o.callBack != null){
								grabData();
							}

							// no pagination with callback
							if(paginationCount === 0 && o.callBack != null){
								$.when( grabData() ).then(function(){
									executeCallback(o.callBack);
									$parent.show();
								});
							}

							// pagination present no callback
							if(paginationCount !== 0 && o.callBack == null){
								grabData();
								$parent.show();
							}

							// no pagination no callback
							if(paginationCount === 0 && o.callBack == null){
								$parent.show();
							}

							function grabData(){

								var firstUrl = $pagination.find(bcPaginationNext).find('a').attr('href');

								_loadData(firstUrl);

								function _loadData(url){
									$.get(url).done(function (html){
										_renderHtml(html);
									});
								}

								function _renderHtml(html){
									var markup = $(html).find('.'+ajaxHandleClass).html();
											$parent.append(markup);
											var nextLink = $parent.find('.'+o.bcPagClass+':last '+o.bcPaginationNext+' a').attr('href');
											if(nextLink){
												_loadData(nextLink);
											}
											else {
												executeCallback(o.callBack);
												$parent.show();
											}
								}
							
							} // grabData
							
							function executeCallback(callback){
								if(typeof callback === 'function') {
									var deferred = $.Deferred();
									deferred.resolve(callback());
									return deferred.promise();
								}
							}
	         
	     
	    }; // $.fn

	}(jQuery));