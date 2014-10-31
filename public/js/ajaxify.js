// Ajaxify
// v1.0.1 - 30 September, 2012
// https://github.com/browserstate/ajaxify
(function(window,undefined){
    
    // Prepare our Variables
    var
        History = window.History,
        $ = window.jQuery,
        document = window.document;

    // Check to see if History.js is enabled for our Browser
    if ( !History.enabled ) {
        return false;
    }

    // Wait for Document
    $(function(){
        // Prepare Variables
        var
            /* Application Specific Variables */
            contentSelector = '#main',
            $content = $(contentSelector).filter(':first'),
            contentNode = $content.get(0),
            $menu = $('#menu,#nav,nav:first,.nav:first').filter(':first'),
            activeClass = 'active selected current youarehere',
            activeSelector = '.active,.selected,.current,.youarehere',
            menuChildrenSelector = '> li,> ul > li',
            completedEventName = 'statechangecomplete',
            /* Application Generic Variables */
            $window = $(window),
            $body = $(document.body),
            rootUrl = History.getRootUrl(),
            scrollOptions = {
                duration: 800,
                easing:'swing'
            };
        
        // Ensure Content
        if ( $content.length === 0 ) {
            $content = $body;
        }
        
        // Internal Helper
        $.expr[':'].internal = function(obj, index, meta, stack){
            // Prepare
            var
                $this = $(obj),
                url = $this.attr('href')||'',
                isInternalLink;
            
            // Check link
            isInternalLink = url.substring(0,rootUrl.length) === rootUrl || url.indexOf(':') === -1;
            
            // Ignore or Keep
            return isInternalLink;
        };
        
        // HTML Helper
        var documentHtml = function(html){
            // Prepare
            var result = String(html)
                .replace(/<\!DOCTYPE[^>]*>/i, '')
                .replace(/<(html|head|body|title|meta|script)([\s\>])/gi,'<div class="document-$1"$2')
                .replace(/<\/(html|head|body|title|meta|script)\>/gi,'</div>')
            ;
            // console.log(result);
            // Return
            return $.trim(result);
        };

        
        // Ajaxify Helper
        $.fn.ajaxify = function(){
            // Prepare
            var $this = $(this);
            
            // Ajaxify
            $this.find('a:internal:not(.no-ajaxy)').click(function(event){
                // Prepare
                var
                    $this = $(this),
                    url = $this.attr('href'),
                    title = $this.attr('title')||null;
                
                // Continue as normal for cmd clicks etc
                if ( event.which == 2 || event.metaKey ) { return true; }
                
                // Ajaxify this link
                History.pushState(null,title,url);
                event.preventDefault();
                return false;
            });
            
            // Chain
            return $this;
        };
        
        // Ajaxify our Internal Links
        $body.ajaxify();
        
        // Hook into State Changes
        $window.bind('statechange',function(){
            // Prepare Variables
            var
                State = History.getState(),
                url = State.url,
                relativeUrl = url.replace(rootUrl,'');

            var pattern = /.+\/([^\/]+)/;
            var regexpMatches = pattern.exec(url);
            myindex = jQuery.inArray(regexpMatches[1],mypages);

            // Set Loading
            //$body.addClass('loading');
            // $body.addClass(mypages[myindex]);

            // Start Fade Out
            // Animating to opacity to 0 still keeps the element's height intact
            // Which prevents that annoying pop bang issue when loading in new content
            window.setTimeout(function(){

            
            // Ajax Request the Traditional Page
            $.ajax({
                url: url,
                success: function(data, textStatus, jqXHR){
                    // Prepare
                    var
                        $data = $(documentHtml(data)),
                        $dataBody = $data.find('.document-body:first'),
                        $dataContent = $dataBody.find(contentSelector).filter(':first'),
                        $menuChildren, contentHtml, $scripts;
                    // Fetch the scripts
                    $scripts = $dataContent.find('.document-script');
                    if ( $scripts.length ) {
                        $scripts.detach();
                    }

                    if (myscripts[myindex]!=0){fetchfile(myscripts[myindex],'js')}
                    // Fetch the content
                    contentHtml = $dataContent.html()||$data.html();
                    if ( !contentHtml ) {
                        document.location.href = url;
                        return false;
                    }
                    
                    // Update the menu
                    $menuChildren = $menu.find(menuChildrenSelector);
                    $menuChildren.filter(activeSelector).removeClass(activeClass);
                    $menuChildren = $menuChildren.has('a[href^="'+relativeUrl+'"],a[href^="/'+relativeUrl+'"],a[href^="'+url+'"]');
                    if ( $menuChildren.length === 1 ) { $menuChildren.addClass(activeClass); }

                    // Update the content
                    // $content.stop(true,true);
                    // $content.html(contentHtml).ajaxify().css('opacity',100).show(); /* you could fade in here if you'd like */

                    if (mainN == 1){
                        mainN = 2;
                        updateMainElement();

                        $('#main2').stop(true,true);
                        $('#main2').append( contentHtml ).ajaxify();
                        $('#main2').html(contentHtml).ajaxify();                        

                        $('#main').removeClass('active').addClass('goaway');
                        $('#main').css('top', 2*$(window).height()/3 )

                        $('#main2').addClass( mypages[ myindex ] );
                        $('#main2').css('height', $(window).height());
                        $('#main2').removeClass('inactive').addClass('comein');
                        $('#main2').css('top', 0 );
                        $('#main2').scrollTop(0);

                        window.setTimeout(function(){
                            $body.removeClass(mypages[previndex]);
                            previndex=myindex;
                            $('#main').removeClass().addClass('inactive');
                            $('#main2').removeClass('comein').addClass('active');
                            $('#main').css('height', 0);
                            $('#main').css('top',$(window).height());
                        },600);
                    }
                    else{
                        mainN = 1;
                        updateMainElement();
                        $('#main').stop(true,true);
                        $('#main').append( contentHtml ).ajaxify();
                        $('#main').html(contentHtml).ajaxify();

                        $('#main2').removeClass('active').addClass('goaway');
                        $('#main2').css('top', 2*$(window).height()/3 );

                        $('#main').addClass( mypages[ myindex ] );
                        $('#main').css('height', $(window).height());
                        $('#main').removeClass('inactive').addClass('comein');
                        $('#main').css('top', 0 );
                        $('#main').scrollTop(0);


                        window.setTimeout(function(){
                            $body.removeClass(mypages[previndex]);
                            previndex=myindex;
                            $('#main2').removeClass().addClass('inactive');
                            $('#main').removeClass('comein').addClass('active');
                            $('#main2').css('height', 0);
                            $('#main2').css('top',$(window).height());
                        },600);
                    }

                    // Update the title
                    document.title = $data.find('.document-title:first').text();
                    try {
                        document.getElementsByTagName('title')[0].innerHTML = document.title.replace('<','&lt;').replace('>','&gt;').replace(' & ',' &amp; ');
                    }
                    catch ( Exception ) { }
                    
                    // Add the scripts
                    $scripts.each(function(){
                        var $script = $(this), scriptText = $script.text(), scriptNode = document.createElement('script');
                        if ( $script.attr('src') ) {
                            if ( !$script[0].async ) { scriptNode.async = false; }
                            scriptNode.src = $script.attr('src');
                        }
                            scriptNode.appendChild(document.createTextNode(scriptText));
                        contentNode.appendChild(scriptNode);
                    });

                    // Complete the change
                    if ( $body.ScrollTo||false ) { $body.ScrollTo(scrollOptions); } /* http://balupton.com/projects/jquery-scrollto */
                    $body.removeClass('loading');
                    $window.trigger(completedEventName);
    
                    // Inform Google Analytics of the change
                    if ( typeof window._gaq !== 'undefined' ) {
                        window._gaq.push(['_trackPageview', relativeUrl]);
                    }

                    // Inform ReInvigorate of a state change
                    if ( typeof window.reinvigorate !== 'undefined' && typeof window.reinvigorate.ajax_track !== 'undefined' ) {
                        reinvigorate.ajax_track(url);
                        // ^ we use the full url here as that is what reinvigorate supports
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    document.location.href = url;
                    return false;
                }
            }); // end ajax
        },1);
        }); // end onStateChange

    }); // end onDomLoad

})(window); // end closure

//add necessary scripts or css to head
function fetchfile(filename,filetype){
    // var added = checkHead(filename);
    var added = false; //temperary solution to reload script function :(
    if (!added){
        var tempfile;
        if (filetype=="js"){
            tempfile=document.createElement('script');
            tempfile.type='text/javascript';
            tempfile.src=filename;
            tempfile.onload = function(){
                setHeader();
            }
        }
        else if (filetype=="css"){
            tempfile=document.createElement('link');
            tempfile.rel='stylesheet';
            tempfile.type='text/css';
            tempfile.href=filename;
        }
        if (typeof tempfile!="undefined"){
            document.getElementsByTagName("head")[0].appendChild(tempfile);
        }
    }
}

//check files in head to prevent duplicates
//not being used yet :(
function checkHead(filename){
    var added = false;
    var temp = filename.replace("..","");
    var addedscripts = $('head script');
    addedscripts.map(function(i,d){
        // console.log(temp);
        // console.log(d.src);
        var match = d.src.match(temp);
        // console.log(match==null);
        if (match!=null) {added=true}
    })
    return added;
}