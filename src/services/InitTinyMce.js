
// Todo: 
// Add a method to handle Image Upload from TinyMCE Editor
// Add a method to setTheContent 
// Add a method to getTheContent

class InitTinyMce {

  /**
   * Init Tiny Mce Editor
   * 
   * Make Cure the FormData Param comes with message 
   * i.e FormData.message
   * @param {Object} formData 
   */
  init(formData, tinymce, boxSelector = "textarea#message", width="100%", height="700px" ) {
    tinymce.remove();

    let component = formData;
    // Tiny MCE Free Init
    tinymce.init({
      selector: boxSelector,
      target: this.$el,
      init_instance_callback: function (editor) {
        editor.on("Change KeyUp Undo Redo", function (e) {
          component.message = editor.getContent();
        });
        // component.objTinymce = editor;
        if (component.message !== null && component.message !== "") {
          editor.setContent(component.message);
        }
      },
      height: height,
      width: width,
      menubar: true,
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste help wordcount autoresize",
      ],
      toolbar:
        "undo redo | formatselect | " +
        "bold italic backcolor | alignleft aligncenter " +
        "alignright alignjustify | bullist numlist outdent indent | " +
        "removeformat | help | fullscreen | image | paste | file",
      content_style:
        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      statusbar: false,
      toolbar_items_size: "small",
      element_format: "html",
      encoding: "UTF-8",
      entity_encoding: "html",
      oninit: "setPlainText",
      apply_source_formatting: true,
      images_upload_url: "http://localhost/regno/image_processor.php",
      automatic_uploads: true,
      images_dataimg_filter: function (img) {
        return !img.hasAttribute("internal-blob"); // blocks the upload of <img> elements with the attribute "internal-blob".
      },
      file_picker_types: "file image media",
      images_file_types: "jpg,svg,webp,png,svg",
      allow_script_urls: true,
      convert_urls: false,
      extended_valid_elements: "style,link[href|rel]",
      custom_elements: "style,link,~link",
      verify_html: false,
      inline_styles: true,
      // setup: function(ed) {
      //     ed.on('change', function(e) {
      //         tinyMCE.triggerSave();
      //     });
      // },
      // cleanup: true,
    });
  }
}

export default new InitTinyMce();