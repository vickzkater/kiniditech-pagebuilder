/**
 * PageBuilder - Landing Page (Build landing pages using content elements)
 * Version: 1.0.0 (2020-06-10)
 *
 * Copyright (c) KINIDI Tech and other contributors
 * Released under the MIT license.
 * For more information, see https://kiniditech.com/ or https://github.com/vickzkater
 *
 * PageBuilder depends on several libraries, such as:
 * - jQuery (https://jquery.com/download/)
 * - jQuery UI (https://jqueryui.com/download/)
 * - TinyMCE (https://www.tiny.cloud/get-tiny/downloads/)
 * - Bootstrap (https://getbootstrap.com/docs/4.3/getting-started/download/)
 *
 * Support Form Elements:
 * - Masthead (Support Multiple Item)
 * - Text (Support 3 Items)
 * - Image (Support Multiple Item)
 * - Image + Text + Button (Support 3 Items)
 * - Video
 * - Button
 */

function set_content_container(identifier) {
    content_container = identifier;
}

// SECTION - BEGIN
var section_page_id = 0;
function set_section_page_id(identifier) {
    section_page_id = identifier;
}

function add_section_element(collapsed = false, identifier = 0) {
    // SET "content_container" TO THE DEFAULT
    set_content_container("#content-pagebuilder");

    if (identifier == 0) {
        var uniqid = Date.now();
    } else {
        var uniqid = identifier;
    }

    var html = '<div class="panel panel-pagebuilder-section" id="pagebuilder_section_page_' + uniqid + '">';
    
    if (collapsed) {
        html += '<a class="panel-heading panel-pagebuilder-section-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse_section_' + uniqid + '" aria-expanded="false">';
    } else {
        html += '<a class="panel-heading panel-pagebuilder-section-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse_section_' + uniqid + '" aria-expanded="true">';
    }
        html += '<h4 class="panel-title">Section <i id=v_section_' + uniqid + '></i><span class="pull-right"><i class="fa fa-sort"></i><i class="fa fa-trash" style="color:red; margin-left: 20px;" onclick="delete_section_element(' + uniqid + ')"></i></span></h4>';
    html += '</a>';

    if (collapsed) {
        html += '<div id="collapse_section_' + uniqid + '" class="panel-collapse collapse" role="tabpanel">';
    } else {
        html += '<div id="collapse_section_' + uniqid + '" class="panel-collapse collapse in" role="tabpanel">';
    }

            html += '<div class="panel-body">';

                // SECTION
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Section <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="" name="v_page_section[' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12" onblur="set_section_page_name(' + uniqid + ', this.value)">';
                    html += '</div>';
                html += '</div>';

                // STYLE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Style <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_section_style[' +  uniqid + ']" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="white">White</option>';
                            html += '<option value="light grey">Light Grey</option>';
                            html += '<option value="dark grey">Dark Grey</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';

                html += '<div class="sortable-section" id="list-section-' + uniqid + '"></div>';
                html += "<hr>";

                html += "<center>";
                    html += '<span class="btn btn-primary" data-toggle="modal" data-target=".modal-add-content-element" onclick="set_content_container(\'#list-section-' + uniqid + '\'); set_section_page_id(' + uniqid + ');">';
                        html += '<i class="fa fa-plus-circle"></i>&nbsp; Add Content Element</span>';
                    html += '</span>';
                html += "</center>";
                
            html += "</div><!-- /.panel-body -->";
        html += "</div><!-- /.panel-collapse -->";
    html += "</div><!-- /.panel -->";

    $(content_container).append(html);

    // INITIALIZE SORTABLE FOR CONTENT ELEMENT CONTAINER IN THIS SECTION PAGE
    $('#list-section-' + uniqid).sortable();
}

function set_section_page_name(id, value) {
    $("#v_section_" + id).html(value);
}

function delete_section_element(id) {
    if (confirm("Are you sure to delete this section?\n(this action can't be undone)")) {
        $("#pagebuilder_section_page_" + id).remove();
        return true;
    }
    return false;
}
// SECTION - END

function add_content_element_page(
    type,
    collapsed = false,
    identifier = 0,
    data = ""
) {
    if (identifier == 0) {
        var uniqid = Date.now();
    } else {
        var uniqid = identifier;
    }
  
    var html_content_element = "";
  
    switch (type) {
        case "masthead":
            html_content_element = set_element_page_masthead(collapsed, uniqid, data);
            break;

        case "text":
            html_content_element = set_element_page_text(collapsed, uniqid, data);
            break;

        case "image":
            html_content_element = set_element_page_image(collapsed, uniqid, data);
            break;

        case "image + text + button":
            html_content_element = set_element_page_imagetextbutton(collapsed, uniqid, data);
            break;

        case "video":
            html_content_element = set_element_page_video(collapsed, uniqid, data);
            break;

        case "button":
            html_content_element = set_element_page_button(collapsed, uniqid, data);
            break;
  
        default:
            alert("NO CONTENT ELEMENT TYPE SELECTED");
            return false;
            break;
    }
  
    $(content_container).append(html_content_element);

    // CALL THE FUNCTION FOR SPECIFIC ELEMENT TYPE
    switch (type) {
        case "masthead":
            $('#list-masthead-'+uniqid).sortable();
            break;

        case "text":
            initialize_tinymce('.page-element-text-editor');
            break;

        case "image":
            $('#list-image-'+uniqid).sortable();
            break;

        case "image + text + button":
            initialize_tinymce('.page-element-text-editor');
            break;

        case "video":
            initialize_tinymce('.page-element-text-editor');
            break;
    }
}

// SET CONTENT ELEMENT BELOW *********

function show_input_link(this_value, identifier) {
    // HIDE ALL CONTENTS
    $('.pagebuilder-link-'+identifier).hide();
    $('#pagebuilder-link-internal-'+identifier).hide();
    $('#pagebuilder-link-external-'+identifier).hide();

    // SHOW THE CONTENT
    if (this_value == 'external') {
        $('#pagebuilder-link-external-'+identifier).show();
        $('.pagebuilder-link-'+identifier).show();
    }else if (this_value == 'internal') {
        $('#pagebuilder-link-internal-'+identifier).show();
        $('.pagebuilder-link-'+identifier).show();
    }
}

// MASTHEAD - BEGIN
function set_element_page_masthead(collapsed, uniqid, data) {
    var element_type = "masthead";
    var element_type_title = "Masthead";
    var section_name = "";
    var data_image = pagebuilder_no_img;
    var is_required = 'required="required"';
    var data_text = "";
    var text_position_left = "";
    if (data != "") {
        section_name = data.section;
        data_image = decodeURI(data.image);
        is_required = "";
        data_text = decodeURI(data.text);
        if (data.text_position == "left") {
            text_position_left = "selected";
        }
    }
  
    var html = '<div class="panel panel-content-element" id="pagebuilder_elm_' + uniqid + '">';
        html += '<input type="hidden" name="v_page_element_type[' + section_page_id + '][' + uniqid + ']" value="'+element_type+'">';
  
    if (collapsed) {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="false">';
    } else {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="true">';
    }
            html += '<h4 class="panel-title">'+element_type_title+' - Section <i id=section' + uniqid + ">" + section_name + '</i><span class="pull-right"><i class="fa fa-sort"></i><i class="fa fa-trash" style="color:red; margin-left: 20px;" onclick="delete_content_element(' + uniqid + ')"></i></span></h4>';
        html += "</a>";
  
    if (collapsed) {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse" role="tabpanel">';
    } else {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse in" role="tabpanel">';
    }
  
            html += '<div class="panel-body">';

                // SECTION
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Section <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="' + section_name + '" name="v_page_element_section[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12" onblur="set_section_name(' + uniqid + ', this.value)">';
                    html += '</div>';
                html += '</div>';

                html += "<center>";
                    html += '<span class="btn btn-success" onclick="add_masthead_item(' + section_page_id + ', ' + uniqid + ');">';
                        html += '<i class="fa fa-plus-circle"></i>&nbsp; Add Item</span>';
                    html += '</span>';
                html += "</center>";

                html += '<hr><div class="sortable-masthead" id="list-masthead-' + uniqid + '"></div>';

                // STATUS
                html += '<hr><div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Status<span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_status[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="1">ACTIVE</option>';
                            html += '<option value="0">Not Active</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';
            
            html += '</div><!-- /.panel-body -->';
        html += '</div><!-- /.panel-collapse -->';
    html += '</div><!-- /.panel -->';
  
    return html;
}

function add_masthead_item(section_page_id, uniqid) {
    var identifier = Date.now();
    var parent_container = '#list-masthead-'+uniqid;
    var html ='';

    var is_required = 'required="required"';

    html += '<div class="panel panel-pagebuilder-masthead" id="pagebuilder_masthead_page_' + identifier + '">';
        html += '<a class="panel-heading panel-pagebuilder-masthead-heading" role="tab" data-toggle="collapse" data-parent="' + parent_container + '" href="#collapse_section_' + identifier + '" aria-expanded="false">';
            html += '<h4 class="panel-title">Masthead <i id=v_panel_masthead_' + identifier + '></i><span class="pull-right"><i class="fa fa-sort"></i><i class="fa fa-trash" style="color:red; margin-left: 20px;" onclick="delete_masthead_item(' + identifier + ')"></i></span></h4>';
        html += '</a>';

        html += '<div id="collapse_section_' + identifier + '" class="panel-collapse collapse" role="tabpanel">';
            html += '<div class="panel-body">';

                // IMAGE TITLE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Image Title <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="" name="v_page_element_image_title[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" required="required" class="form-control col-md-7 col-xs-12" onblur="set_masthead_item_name(' + identifier + ', this.value)">';
                    html += '</div>';
                html += '</div>';

                // DESKTOP IMAGE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Desktop Image <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<img src="' + pagebuilder_no_img + '" class="pagebuilder-content-image">';
                        html += '<input type="file" name="v_page_element_image[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" ' + is_required + ' class="form-control col-md-7 col-xs-12" accept=".jpg, .jpeg, .png" onchange="display_img_input(this, \'before\');" style="margin-top:5px">';
                    html += '</div>';
                html += '</div>';

                // MOBILE IMAGE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Mobile Image <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<img src="' + pagebuilder_no_img + '" class="pagebuilder-content-image">';
                        html += '<input type="file" name="v_page_element_image_mobile[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" ' + is_required + ' class="form-control col-md-7 col-xs-12" accept=".jpg, .jpeg, .png" onchange="display_img_input(this, \'before\');" style="margin-top:5px">';
                    html += '</div>';
                html += '</div>';

                // ON-IMAGE TITLE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">On-Image Title</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<textarea name="v_page_element_title[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12" placeholder="optional"></textarea>';
                    html += '</div>';
                html += '</div>';

                // ON-IMAGE SUBTITLE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">On-Image Subtitle</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<textarea name="v_page_element_subtitle[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12" placeholder="optional"></textarea>';
                    html += '</div>';
                html += '</div>';

                // CONTENT ALIGNMENT
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Content Alignment <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_alignment[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" required="required" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="left">Left (content area width becomes 50%)</option>';
                            html += '<option value="center">Center (content area width becomes 67%)</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';

                var this_array = [ 'A', 'B' ];
                $.each(this_array, function(index, value) {
                    html+= '<hr>';

                    // BUTTON - LINK TYPE
                    html += '<div class="form-group">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button '+value+' - Link Type</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<select name="v_page_element_button_link_type[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ][]" class="form-control col-md-7 col-xs-12" onchange="show_input_link(this.value, \'' + uniqid + identifier + value + '\')">';
                                html += '<option value="no link">- NO LINK -</option>';
                                html += '<option value="internal">Internal</option>';
                                html += '<option value="external">External</option>';
                            html += "</select>";
                        html += '</div>';
                    html += '</div>';

                    // BUTTON - LINK (INTERNAL)
                    html += '<div class="form-group" id="pagebuilder-link-internal-' + uniqid + identifier + value + '" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button '+value+' - Link (Internal)</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<div class="input-group">';
                                html += '<span class="input-group-addon">' + pagebuilder_url + '/</span>';
                                html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_link_internal[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ][]" class="form-control col-md-7 col-xs-12">';
                            html += '</div>';
                        html += '</div>';
                    html += '</div>';

                    // BUTTON - LINK (EXTERNAL)
                    html += '<div class="form-group" id="pagebuilder-link-external-' + uniqid + identifier + value + '" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button '+value+' - Link (External)</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_link_external[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ][]" class="form-control col-md-7 col-xs-12" placeholder="(sample: https://domain.com/promo-september)">';
                        html += '</div>';
                    html += '</div>';

                    // BUTTON - LINK TARGET
                    html += '<div class="form-group pagebuilder-link-' + uniqid + identifier + value + '" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button '+value+' - Link Target</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<select name="v_page_element_button_link_target[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ][]" class="form-control col-md-7 col-xs-12">';
                                html += '<option value="">- Please Choose One -</option>';
                                html += '<option value="on page">opened on the same page</option>';
                                html += '<option value="new page">opened in a new page</option>';
                            html += "</select>";
                        html += '</div>';
                    html += '</div>';

                    // BUTTON - LABEL
                    html += '<div class="form-group pagebuilder-link-' + uniqid + identifier + value + '" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button '+value+' - Label</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_label[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ][]" class="form-control col-md-7 col-xs-12" placeholder="optional">';
                        html += '</div>';
                    html += '</div>';

                    // BUTTON - STYLE
                    html += '<div class="form-group pagebuilder-link-' + uniqid + identifier + value + '" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button '+value+' - Style</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<select name="v_page_element_button_style[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ][]" class="form-control col-md-7 col-xs-12">';
                                html += '<option value="">- Please Choose One -</option>';
                                html += '<option value="style 1">Style 1</option>';
                                html += '<option value="style 2">Style 2</option>';
                            html += "</select>";
                        html += '</div>';
                    html += '</div>';
                });

                // STATUS PER ITEM
                html += '<hr><div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Item Status<span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_status_item[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" required="required" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="1">ACTIVE</option>';
                            html += '<option value="0">Not Active</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';

            html += '</div><!-- /.panel-body -->';
        html += '</div><!-- /.panel-collapse -->';
    html += '</div><!-- /.panel -->';

    $(parent_container).append(html);
}

function set_masthead_item_name(id, value) {
    $("#v_panel_masthead_" + id).html(value);
}

function delete_masthead_item(id) {
    if (confirm("Are you sure to delete this masthead item?\n(this action can't be undone)")) {
        $("#pagebuilder_masthead_page_" + id).remove();
        return true;
    }
    return false;
}
// MASTHEAD - END

// TEXT - BEGIN
function set_element_page_text(collapsed, uniqid, data) {
    var element_type = "text";
    var element_type_title = "Text";
    var section_name = "";
    var data_image = pagebuilder_no_img;
    var is_required = 'required="required"';
    var data_text = "";
    var text_position_left = "";
    if (data != "") {
        section_name = data.section;
        data_image = decodeURI(data.image);
        is_required = "";
        data_text = decodeURI(data.text);
        if (data.text_position == "left") {
            text_position_left = "selected";
        }
    }
  
    var html = '<div class="panel panel-content-element" id="pagebuilder_elm_' + uniqid + '">';
        html += '<input type="hidden" name="v_page_element_type[' + section_page_id + '][' + uniqid + ']" value="'+element_type+'">';
  
    if (collapsed) {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="false">';
    } else {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="true">';
    }
            html += '<h4 class="panel-title">'+element_type_title+' - Section <i id=section' + uniqid + ">" + section_name + '</i><span class="pull-right"><i class="fa fa-sort"></i><i class="fa fa-trash" style="color:red; margin-left: 20px;" onclick="delete_content_element(' + uniqid + ')"></i></span></h4>';
        html += "</a>";
  
    if (collapsed) {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse" role="tabpanel">';
    } else {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse in" role="tabpanel">';
    }
  
            html += '<div class="panel-body">';

                // SECTION
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Section <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="' + section_name + '" name="v_page_element_section[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12" onblur="set_section_name(' + uniqid + ', this.value)">';
                    html += '</div>';
                html += '</div>';

                // CONTENT WIDTH
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Content Width <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_width[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12">';
                        var this_array = [ 100, 67, 50 ];
                        $.each(this_array, function(index, value) {
                            html += '<option value="'+value+'">'+value+'%</option>';
                        });
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // CONTENT ALIGNMENT
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Content Alignment <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_alignment[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="left">Left (content area width becomes 50%)</option>';
                            html += '<option value="center" ' + text_position_left + '>Center (content area width becomes 67%)</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';

                // TOTAL ITEM / COLUMN
                var max_items = 3;
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Column <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_total_item[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12" required="required" onchange="show_multiple_text(this.value, '+max_items+', ' + uniqid + ')">';
                            html += '<option value="" selected disabled>- Please Choose One -</option>';
                        for (i = 1; i <= max_items; i++) {
                            html += '<option value="'+i+'">'+i+'</option>';
                        }
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // LOOPING THE CONTENTS BELOW UNTIL THE MAXIMUM NUMBER OF ITEMS
                for (i = 1; i <= max_items; i++) {

                    html += '<hr class="page-element-text-'+uniqid+'-'+i+'" style="display:none;">';
                    // TEXT
                    html += '<div class="form-group page-element-text-'+uniqid+'-'+i+'" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Content Text #'+i+' <span class="required">*</span></label>';
                        html += '<div class="col-md-9 col-sm-9 col-xs-12">';
                            html += '<textarea name="v_page_element_text[' + section_page_id + '][' + uniqid + '][]" class="form-control col-md-7 col-xs-12 page-element-text-editor"></textarea>';
                        html += '</div>';
                    html += '</div>';

                }

                // STATUS
                html += '<hr><div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Status<span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_status[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="1">ACTIVE</option>';
                            html += '<option value="0">Not Active</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';
            
            html += '</div><!-- /.panel-body -->';
        html += '</div><!-- /.panel-collapse -->';
    html += '</div><!-- /.panel -->';
  
    return html;
}

function show_multiple_text(this_value, total_item, identifier) {
    // HIDE ALL CONTENTS
    for (i = 1; i <= total_item; i++) {
        $('.page-element-text-'+identifier+'-'+i+'').hide();
    }
    // SHOW THE CONTENTS
    for (i = 1; i <= this_value; i++) {
        $('.page-element-text-'+identifier+'-'+i+'').show();
    }
}
// TEXT - END

// IMAGE - BEGIN
function set_element_page_image(collapsed, uniqid, data) {
    var element_type = "image";
    var element_type_title = "Image";
    var section_name = "";
    var data_image = pagebuilder_no_img;
    var is_required = 'required="required"';
    var data_text = "";
    var text_position_left = "";
    if (data != "") {
        section_name = data.section;
        data_image = decodeURI(data.image);
        is_required = "";
        data_text = decodeURI(data.text);
        if (data.text_position == "left") {
            text_position_left = "selected";
        }
    }
  
    var html = '<div class="panel panel-content-element" id="pagebuilder_elm_' + uniqid + '">';
        html += '<input type="hidden" name="v_page_element_type[' + section_page_id + '][' + uniqid + ']" value="'+element_type+'">';
  
    if (collapsed) {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="false">';
    } else {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="true">';
    }
            html += '<h4 class="panel-title">'+element_type_title+' - Section <i id=section' + uniqid + ">" + section_name + '</i><span class="pull-right"><i class="fa fa-sort"></i><i class="fa fa-trash" style="color:red; margin-left: 20px;" onclick="delete_content_element(' + uniqid + ')"></i></span></h4>';
        html += "</a>";
  
    if (collapsed) {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse" role="tabpanel">';
    } else {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse in" role="tabpanel">';
    }
  
            html += '<div class="panel-body">';

                // SECTION
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Section <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="' + section_name + '" name="v_page_element_section[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12" onblur="set_section_name(' + uniqid + ', this.value)">';
                    html += '</div>';
                html += '</div>';

                // SHOW TYPE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Type</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_image_type[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12">';
                            var this_array = [ 'Slideshow', 'Carousel' ];
                            $.each(this_array, function(index, value) {
                                html += '<option value="'+value+'">'+value+'</option>';
                            });
                        html += '</select>';
                    html += '</div>';
                html += '</div>';

                html += "<center>";
                    html += '<span class="btn btn-success" onclick="add_image_item(' + section_page_id + ', ' + uniqid + ');">';
                        html += '<i class="fa fa-plus-circle"></i>&nbsp; Add Item</span>';
                    html += '</span>';
                html += "</center>";

                html += '<hr><div class="sortable-image" id="list-image-' + uniqid + '"></div>';

                // STATUS
                html += '<hr><div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Status<span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_status[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="1">ACTIVE</option>';
                            html += '<option value="0">Not Active</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';
            
            html += '</div><!-- /.panel-body -->';
        html += '</div><!-- /.panel-collapse -->';
    html += '</div><!-- /.panel -->';
  
    return html;
}

function add_image_item(section_page_id, uniqid) {
    var identifier = Date.now();
    var image_container = '#list-image-'+uniqid;
    var html ='';

    html += '<div class="panel panel-pagebuilder-image" id="pagebuilder_image_page_' + identifier + '">';
        html += '<a class="panel-heading panel-pagebuilder-image-heading" role="tab" data-toggle="collapse" data-parent="' + image_container + '" href="#collapse_section_' + identifier + '" aria-expanded="false">';
            html += '<h4 class="panel-title">Image <i id=v_panel_image_' + identifier + '></i><span class="pull-right"><i class="fa fa-sort"></i><i class="fa fa-trash" style="color:red; margin-left: 20px;" onclick="delete_image_item(' + identifier + ')"></i></span></h4>';
        html += '</a>';

        html += '<div id="collapse_section_' + identifier + '" class="panel-collapse collapse" role="tabpanel">';
            html += '<div class="panel-body">';

                // IMAGE - TITLE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Image Title <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="" name="v_page_element_image_title[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" required="required" class="form-control col-md-7 col-xs-12" onblur="set_image_item_name(' + identifier + ', this.value)">';
                    html += '</div>';
                html += '</div>';

                // IMAGE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Image <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<img src="' + pagebuilder_no_img + '" class="pagebuilder-content-image">';
                        html += '<input type="file" name="v_page_element_image[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12" accept=".jpg, .jpeg, .png" onchange="display_img_input(this, \'before\');" style="margin-top:5px">';
                    html += '</div>';
                html += '</div>';

                // LINK TYPE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Link Type</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_link_type[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12" onchange="show_input_link(this.value, \'' + identifier + '\')">';
                            html += '<option value="no link">- NO LINK -</option>';
                            html += '<option value="internal">Internal</option>';
                            html += '<option value="external">External</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // LINK - INTERNAL
                html += '<div class="form-group" id="pagebuilder-link-internal-' + identifier + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Link (Internal)</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<div class="input-group">';
                            html += '<span class="input-group-addon">' + pagebuilder_url + '/</span>';
                            html += '<input type="text" autocomplete="off" value="" name="v_page_element_link_internal[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12">';
                        html += '</div>';
                    html += '</div>';
                html += '</div>';

                // LINK - EXTERNAL
                html += '<div class="form-group" id="pagebuilder-link-external-' + identifier + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Link (External)</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="" name="v_page_element_link_external[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12" placeholder="(sample: https://domain.com/promo-september)">';
                    html += '</div>';
                html += '</div>';

                // LINK TARGET
                html += '<div class="form-group pagebuilder-link-' + identifier + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Link Target</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_link_target[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="">- Please Choose One -</option>';
                            html += '<option value="on page">opened on the same page</option>';
                            html += '<option value="new page">opened in a new page</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // STATUS PER ITEM
                html += '<hr><div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Item Status<span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_status_item[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" required="required" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="1">ACTIVE</option>';
                            html += '<option value="0">Not Active</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';

            html += '</div><!-- /.panel-body -->';
        html += '</div><!-- /.panel-collapse -->';
    html += '</div><!-- /.panel -->';

    $(image_container).append(html);
}

function set_image_item_name(id, value) {
    $("#v_panel_image_" + id).html(value);
}

function delete_image_item(id) {
    if (confirm("Are you sure to delete this image item?\n(this action can't be undone)")) {
        $("#pagebuilder_image_page_" + id).remove();
        return true;
    }
    return false;
}
// IMAGE - END

// IMAGE + TEXT + BUTTON - BEGIN
function set_element_page_imagetextbutton(collapsed, uniqid, data) {
    var element_type = "image + text + button";
    var element_type_title = "Image + Text + Button";
    var section_name = "";
    var data_image = pagebuilder_no_img;
    var is_required = 'required="required"';
    var data_text = "";
    var text_position_left = "";
    if (data != "") {
        section_name = data.section;
        data_image = decodeURI(data.image);
        is_required = "";
        data_text = decodeURI(data.text);
        if (data.text_position == "left") {
            text_position_left = "selected";
        }
    }
  
    var html = '<div class="panel panel-content-element" id="pagebuilder_elm_' + uniqid + '">';
        html += '<input type="hidden" name="v_page_element_type[' + section_page_id + '][' + uniqid + ']" value="'+element_type+'">';
  
    if (collapsed) {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="false">';
    } else {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="true">';
    }
            html += '<h4 class="panel-title">'+element_type_title+' - Section <i id=section' + uniqid + ">" + section_name + '</i><span class="pull-right"><i class="fa fa-sort"></i><i class="fa fa-trash" style="color:red; margin-left: 20px;" onclick="delete_content_element(' + uniqid + ')"></i></span></h4>';
        html += "</a>";
  
    if (collapsed) {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse" role="tabpanel">';
    } else {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse in" role="tabpanel">';
    }
  
            html += '<div class="panel-body">';

                // SECTION
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Section <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="' + section_name + '" name="v_page_element_section[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12" onblur="set_section_name(' + uniqid + ', this.value)">';
                    html += '</div>';
                html += '</div>';

                // TOTAL ITEM / COLUMN
                var max_items = 3;
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Total Items <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_total_item[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12" required="required" onchange="show_multiple_imagetextbutton(this.value, '+max_items+', ' + uniqid + '); show_set_positioning(this.value, ' + uniqid + ');">';
                            for (i = 1; i <= max_items; i++) {
                                html += '<option value="'+i+'">'+i+'</option>';
                            }
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // POSITIONING
                html += '<div class="form-group" id="positioning-' + uniqid + '">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Positioning <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_alignment[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="Left Image, Right Text">Left Image, Right Text</option>';
                            html += '<option value="Left Text, Right Image">Left Text, Right Image</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // LOOPING THE CONTENTS BELOW UNTIL THE MAXIMUM NUMBER OF ITEMS
                for (i = 1; i <= max_items; i++) {

                    html += '<hr class="page-element-imagetextbutton-'+uniqid+'-'+i+'" style="display:none;">';

                    // IMAGE - TITLE
                    html += '<div class="form-group page-element-imagetextbutton-'+uniqid+'-'+i+'" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Image Title #'+i+' <span class="required">*</span></label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<input type="text" autocomplete="off" value="" name="v_page_element_image_title[' + section_page_id + '][' + uniqid + '][]" required="required" class="form-control col-md-7 col-xs-12">';
                        html += '</div>';
                    html += '</div>';

                    // IMAGE
                    html += '<div class="form-group page-element-imagetextbutton-'+uniqid+'-'+i+'" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Image #'+i+' <span class="required">*</span></label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<img src="' + pagebuilder_no_img + '" class="pagebuilder-content-image">';
                            html += '<input type="file" name="v_page_element_image[' + section_page_id + '][' + uniqid + '][]" class="form-control col-md-7 col-xs-12" accept=".jpg, .jpeg, .png" onchange="display_img_input(this, \'before\');" style="margin-top:5px">';
                        html += '</div>';
                    html += '</div>';

                    // TEXT
                    html += '<div class="form-group page-element-imagetextbutton-'+uniqid+'-'+i+'" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Content Text #'+i+' <span class="required">*</span></label>';
                        html += '<div class="col-md-9 col-sm-9 col-xs-12">';
                            html += '<textarea name="v_page_element_text[' + section_page_id + '][' + uniqid + '][]" class="form-control col-md-7 col-xs-12 page-element-text-editor"></textarea>';
                        html += '</div>';
                    html += '</div>';

                    // BUTTON - LINK TYPE
                    html += '<div class="form-group page-element-imagetextbutton-'+uniqid+'-'+i+'" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Link Type #'+i+'</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<select name="v_page_element_button_link_type[' + section_page_id + '][' + uniqid + '][]" class="form-control col-md-7 col-xs-12" onchange="show_input_link(this.value, \'' + uniqid + i + '\')">';
                                html += '<option value="no link">- NO LINK -</option>';
                                html += '<option value="internal">Internal</option>';
                                html += '<option value="external">External</option>';
                            html += "</select>";
                        html += '</div>';
                    html += '</div>';

                    // BUTTON - LINK (INTERNAL)
                    html += '<div class="form-group" id="pagebuilder-link-internal-' + uniqid + i + '" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Link (Internal) #'+i+'</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<div class="input-group">';
                                html += '<span class="input-group-addon">' + pagebuilder_url + '/</span>';
                                html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_link_internal[' + section_page_id + '][' + uniqid + '][]" class="form-control col-md-7 col-xs-12">';
                            html += '</div>';
                        html += '</div>';
                    html += '</div>';

                    // BUTTON - LINK (EXTERNAL)
                    html += '<div class="form-group" id="pagebuilder-link-external-' + uniqid + i + '" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Link (External) #'+i+'</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_link_external[' + section_page_id + '][' + uniqid + '][]" class="form-control col-md-7 col-xs-12" placeholder="(sample: https://domain.com/promo-september)">';
                        html += '</div>';
                    html += '</div>';

                    // BUTTON - LINK TARGET
                    html += '<div class="form-group pagebuilder-link-' + uniqid + i + '" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Link Target #'+i+'</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<select name="v_page_element_button_link_target[' + section_page_id + '][' + uniqid + '][]" class="form-control col-md-7 col-xs-12">';
                                html += '<option value="">- Please Choose One -</option>';
                                html += '<option value="on page">opened on the same page</option>';
                                html += '<option value="new page">opened in a new page</option>';
                            html += "</select>";
                        html += '</div>';
                    html += '</div>';

                    // BUTTON - LABEL
                    html += '<div class="form-group pagebuilder-link-' + uniqid + i + '" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Label #'+i+'</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_label[' + section_page_id + '][' + uniqid + '][]" class="form-control col-md-7 col-xs-12" placeholder="optional">';
                        html += '</div>';
                    html += '</div>';

                    // BUTTON - STYLE
                    html += '<div class="form-group pagebuilder-link-' + uniqid + i + '" style="display:none;">';
                        html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Style #'+i+'</label>';
                        html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                            html += '<select name="v_page_element_button_style[' + section_page_id + '][' + uniqid + '][]" class="form-control col-md-7 col-xs-12">';
                                html += '<option value="">- Please Choose One -</option>';
                                html += '<option value="style 1">Style 1</option>';
                                html += '<option value="style 2">Style 2</option>';
                            html += "</select>";
                        html += '</div>';
                    html += '</div>';

                }

                // STATUS
                html += '<hr><div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Status<span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_status[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="1">ACTIVE</option>';
                            html += '<option value="0">Not Active</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';
            
            html += '</div><!-- /.panel-body -->';
        html += '</div><!-- /.panel-collapse -->';
    html += '</div><!-- /.panel -->';
  
    return html;
}

function show_multiple_imagetextbutton(this_value, total_item, identifier) {
    // HIDE ALL CONTENTS
    for (i = 1; i <= total_item; i++) {
        $('.page-element-imagetextbutton-'+identifier+'-'+i+'').hide();
    }
    // SHOW THE CONTENTS
    for (i = 1; i <= this_value; i++) {
        $('.page-element-imagetextbutton-'+identifier+'-'+i+'').show();
    }
}

function show_set_positioning(this_value, identifier) {
    if (this_value == 1) {
        $('#positioning-'+identifier).show();
    }else{
        $('#positioning-'+identifier).hide();
    }
}
// IMAGE + TEXT + BUTTON - END

// VIDEO - BEGIN
function set_element_page_video(collapsed, uniqid, data) {
    var element_type = "video";
    var element_type_title = "Video";
    var section_name = "";
    var data_image = pagebuilder_no_img;
    var is_required = 'required="required"';
    var data_text = "";
    var text_position_left = "";
    if (data != "") {
        section_name = data.section;
        data_image = decodeURI(data.image);
        is_required = "";
        data_text = decodeURI(data.text);
        if (data.text_position == "left") {
            text_position_left = "selected";
        }
    }
  
    var html = '<div class="panel panel-content-element" id="pagebuilder_elm_' + uniqid + '">';
        html += '<input type="hidden" name="v_page_element_type[' + section_page_id + '][' + uniqid + ']" value="'+element_type+'">';
  
    if (collapsed) {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="false">';
    } else {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="true">';
    }
            html += '<h4 class="panel-title">'+element_type_title+' - Section <i id=section' + uniqid + ">" + section_name + '</i><span class="pull-right"><i class="fa fa-sort"></i><i class="fa fa-trash" style="color:red; margin-left: 20px;" onclick="delete_content_element(' + uniqid + ')"></i></span></h4>';
        html += "</a>";
  
    if (collapsed) {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse" role="tabpanel">';
    } else {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse in" role="tabpanel">';
    }
  
            html += '<div class="panel-body">';

                // SECTION
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Section <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="' + section_name + '" name="v_page_element_section[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12" onblur="set_section_name(' + uniqid + ', this.value)">';
                    html += '</div>';
                html += '</div>';

                // TYPE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Type <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_video_type[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12" required="required" onchange="show_input_video_text(this.value, ' + uniqid + ');">';
                            html += '<option value="video">Video only</option>';
                            html += '<option value="video + text">Video and Text</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // VIDEO - TITLE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Video Title <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="" name="v_page_element_video_title[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12">';
                    html += '</div>';
                html += '</div>';

                // VIDEO - LINK
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Video Link <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="" name="v_page_element_video[' + section_page_id + '][' + uniqid + ']" required="required" placeholder="https://www.youtube.com/watch?v=XXX" class="form-control col-md-7 col-xs-12">';
                    html += '</div>';
                html += '</div>';

                // POSITIONING
                html += '<div class="form-group input-video-text-' + uniqid + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Positioning <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_alignment[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="Left Video, Right Text">Left Video, Right Text</option>';
                            html += '<option value="Left Text, Right Video">Left Text, Right Video</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // TEXT
                html += '<div class="form-group input-video-text-' + uniqid + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Content Text</label>';
                    html += '<div class="col-md-9 col-sm-9 col-xs-12">';
                        html += '<textarea name="v_page_element_text[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12 page-element-text-editor"></textarea>';
                    html += '</div>';
                html += '</div>';

                // BUTTON - LINK TYPE
                html += '<div class="form-group input-video-text-' + uniqid + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Link Type</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_button_link_type[' + section_page_id + '][' + uniqid + ']" id="button-link-type-' + uniqid + '" class="form-control col-md-7 col-xs-12" onchange="show_input_link(this.value, \'' + uniqid + '\')">';
                            html += '<option value="no link">- NO LINK -</option>';
                            html += '<option value="internal">Internal</option>';
                            html += '<option value="external">External</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // BUTTON - LINK (INTERNAL)
                html += '<div class="form-group" id="pagebuilder-link-internal-' + uniqid + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Link (Internal)</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<div class="input-group">';
                            html += '<span class="input-group-addon">' + pagebuilder_url + '/</span>';
                            html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_link_internal[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12">';
                        html += '</div>';
                    html += '</div>';
                html += '</div>';

                // BUTTON - LINK (EXTERNAL)
                html += '<div class="form-group" id="pagebuilder-link-external-' + uniqid + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Link (External)</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_link_external[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12" placeholder="(sample: https://domain.com/promo-september)">';
                    html += '</div>';
                html += '</div>';

                // BUTTON - LINK TARGET
                html += '<div class="form-group pagebuilder-link-' + uniqid + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Link Target</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_button_link_target[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="">- Please Choose One -</option>';
                            html += '<option value="on page">opened on the same page</option>';
                            html += '<option value="new page">opened in a new page</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // BUTTON - LABEL
                html += '<div class="form-group pagebuilder-link-' + uniqid + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Label</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_label[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12" placeholder="optional">';
                    html += '</div>';
                html += '</div>';

                // BUTTON - STYLE
                html += '<div class="form-group pagebuilder-link-' + uniqid + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Button - Style</label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_button_style[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="">- Please Choose One -</option>';
                            html += '<option value="style 1">Style 1</option>';
                            html += '<option value="style 2">Style 2</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // STATUS
                html += '<hr><div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Status<span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_status[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="1">ACTIVE</option>';
                            html += '<option value="0">Not Active</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';
            
            html += '</div><!-- /.panel-body -->';
        html += '</div><!-- /.panel-collapse -->';
    html += '</div><!-- /.panel -->';
  
    return html;
}

function show_input_video_text(this_value, identifier) {
    if (this_value == 'video + text') {
        $('.input-video-text-'+identifier).show();
    }else{
        $('.input-video-text-'+identifier).hide();
        $('#button-link-type-'+identifier).val('no link');
        show_input_link('no link', identifier);
    }
}
// VIDEO - END

// BUTTON - BEGIN
function set_element_page_button(collapsed, uniqid, data) {
    var element_type = "button";
    var element_type_title = "Button";
    var section_name = "";
    var data_image = pagebuilder_no_img;
    var is_required = 'required="required"';
    var data_text = "";
    var text_position_left = "";
    if (data != "") {
        section_name = data.section;
        data_image = decodeURI(data.image);
        is_required = "";
        data_text = decodeURI(data.text);
        if (data.text_position == "left") {
            text_position_left = "selected";
        }
    }
  
    var html = '<div class="panel panel-content-element" id="pagebuilder_elm_' + uniqid + '">';
        html += '<input type="hidden" name="v_page_element_type[' + section_page_id + '][' + uniqid + ']" value="'+element_type+'">';
  
    if (collapsed) {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="false">';
    } else {
        html += '<a class="panel-heading" role="tab" data-toggle="collapse" data-parent="' + content_container + '" href="#collapse' + uniqid + '" aria-expanded="true">';
    }
            html += '<h4 class="panel-title">'+element_type_title+' - Section <i id=section' + uniqid + ">" + section_name + '</i><span class="pull-right"><i class="fa fa-sort"></i><i class="fa fa-trash" style="color:red; margin-left: 20px;" onclick="delete_content_element(' + uniqid + ')"></i></span></h4>';
        html += "</a>";
  
    if (collapsed) {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse" role="tabpanel">';
    } else {
        html += '<div id="collapse' + uniqid + '" class="panel-collapse collapse in" role="tabpanel">';
    }
  
            html += '<div class="panel-body">';

                // SECTION
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Section <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="' + section_name + '" name="v_page_element_section[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12" onblur="set_section_name(' + uniqid + ', this.value)">';
                    html += '</div>';
                html += '</div>';

                // ALIGNMENT
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Alignment <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_alignment[' + section_page_id + '][' + uniqid + ']" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="left">Left</option>';
                            html += '<option value="center">Center</option>';
                            html += '<option value="right">Right</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                html += "<center>";
                    html += '<span class="btn btn-success" onclick="add_button_item(' + section_page_id + ', ' + uniqid + ');">';
                        html += '<i class="fa fa-plus-circle"></i>&nbsp; Add Item</span>';
                    html += '</span>';
                html += "</center>";

                html += '<hr><div class="sortable-button" id="list-button-' + uniqid + '"></div>';

                // STATUS
                html += '<hr><div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Status<span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_status[' + section_page_id + '][' + uniqid + ']" required="required" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="1">ACTIVE</option>';
                            html += '<option value="0">Not Active</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';
            
            html += '</div><!-- /.panel-body -->';
        html += '</div><!-- /.panel-collapse -->';
    html += '</div><!-- /.panel -->';
  
    return html;
}

function add_button_item(section_page_id, uniqid) {
    var identifier = Date.now();
    var parent_container = '#list-button-'+uniqid;
    var html ='';

    var is_required = 'required="required"';

    html += '<div class="panel panel-pagebuilder-button" id="pagebuilder_button_page_' + identifier + '">';
        html += '<a class="panel-heading panel-pagebuilder-button-heading" role="tab" data-toggle="collapse" data-parent="' + parent_container + '" href="#collapse_section_' + identifier + '" aria-expanded="false">';
            html += '<h4 class="panel-title">Button <i id=v_panel_button_' + identifier + '></i><span class="pull-right"><i class="fa fa-sort"></i><i class="fa fa-trash" style="color:red; margin-left: 20px;" onclick="delete_button_item(' + identifier + ')"></i></span></h4>';
        html += '</a>';

        html += '<div id="collapse_section_' + identifier + '" class="panel-collapse collapse" role="tabpanel">';
            html += '<div class="panel-body">';

                // BUTTON - LABEL
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Label <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_label[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" required="required" class="form-control col-md-7 col-xs-12" onblur="set_button_item_name(' + identifier + ', this.value)">';
                    html += '</div>';
                html += '</div>';

                // BUTTON - STYLE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Style <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_button_style[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="red">Red</option>';
                            html += '<option value="grey">Grey</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // BUTTON - LINK TYPE
                html += '<div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Link Type <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_button_link_type[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12" onchange="show_input_link(this.value, \'' + uniqid + identifier + '\')">';
                            html += '<option value="internal">Internal</option>';
                            html += '<option value="external">External</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // BUTTON - LINK (INTERNAL)
                html += '<div class="form-group" id="pagebuilder-link-internal-' + uniqid + identifier + '">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Link (Internal) <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<div class="input-group">';
                            html += '<span class="input-group-addon">' + pagebuilder_url + '/</span>';
                            html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_link_internal[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12">';
                        html += '</div>';
                    html += '</div>';
                html += '</div>';

                // BUTTON - LINK (EXTERNAL)
                html += '<div class="form-group" id="pagebuilder-link-external-' + uniqid + identifier + '" style="display:none;">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Link (External) <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<input type="text" autocomplete="off" value="" name="v_page_element_button_link_external[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12" placeholder="(sample: https://domain.com/promo-september)">';
                    html += '</div>';
                html += '</div>';

                // BUTTON - LINK TARGET
                html += '<div class="form-group pagebuilder-link-' + uniqid + identifier + '">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Target <span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_button_link_target[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="on page">opened on the same page</option>';
                            html += '<option value="new page">opened in a new page</option>';
                        html += "</select>";
                    html += '</div>';
                html += '</div>';

                // STATUS PER ITEM
                html += '<hr><div class="form-group">';
                    html += '<label class="control-label col-md-3 col-sm-3 col-xs-12">Item Status<span class="required">*</span></label>';
                    html += '<div class="col-md-6 col-sm-6 col-xs-12">';
                        html += '<select name="v_page_element_status_item[' + section_page_id + '][' + uniqid + '][ ' + identifier + ' ]" required="required" class="form-control col-md-7 col-xs-12">';
                            html += '<option value="1">ACTIVE</option>';
                            html += '<option value="0">Not Active</option>';
                        html += '</select>';
                    html += '</div>';
                html += '</div>';

            html += '</div><!-- /.panel-body -->';
        html += '</div><!-- /.panel-collapse -->';
    html += '</div><!-- /.panel -->';

    $(parent_container).append(html);
}

function set_button_item_name(id, value) {
    $("#v_panel_button_" + id).html(value);
}

function delete_button_item(id) {
    if (confirm("Are you sure to delete this button item?\n(this action can't be undone)")) {
        $("#pagebuilder_button_page_" + id).remove();
        return true;
    }
    return false;
}
// BUTTON - END