class InitTinyMce {
  example_image_upload_handler(blobInfo, success, failure, progress) {
    if (blobInfo !== undefined) {
      var xhr, formData;

      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open("POST", "postAcceptor.php");

      xhr.upload.onprogress = function (e) {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = function () {
        var json;

        if (xhr.status === 403) {
          failure("HTTP Error: " + xhr.status, { remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          failure("HTTP Error: " + xhr.status);
          return;
        }

        json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != "string") {
          failure("Invalid JSON: " + xhr.responseText);
          return;
        }

        success(json.location);
      };

      xhr.onerror = function (error) {
        failure(
          "Image upload failed due to a XHR Transport error. Code: " +
            xhr.status
        );
      };

      formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    }
  }

  initTinyMce(selector = "textarea#message", formData, target = "") {
    tinymce.remove();

    var component = formData;
    // Tiny MCE Free Init
    tinymce.init({
      selector: selector,
      target: target,
      init_instance_callback: function (editor) {
        editor.on("Change KeyUp Undo Redo", function (e) {
          component.message = editor.getContent();
        });

        if (component.message !== null && component.message !== "") {
          editor.setContent(component.message);
        }
      },
      height: "700px",
      width: "100%",
      menubar: true,
      plugins: [
        "autoresize advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste help wordcount ",
      ],
      toolbar:
        "fullscreen | undo redo | formatselect | " +
        "bold italic backcolor | alignleft aligncenter " +
        "alignright alignjustify | bullist numlist outdent indent | " +
        "removeformat | help | image | paste | file",
      content_style:
        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      statusbar: false,
      toolbar_items_size: "small",
      element_format: "html",
      encoding: "UTF-8",
      entity_encoding: "html",
      oninit: "setPlainText",
      apply_source_formatting: true,
      images_upload_handler: this.example_image_upload_handler(),
      images_upload_url:
        "http://localhost:8007/api/v1/image_processor/" +
        JSON.parse(localStorage.getItem("user")).usersRef,
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
    });
  }
}

export default new InitTinyMce();
