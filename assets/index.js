var upload = document.querySelector(".upload");
var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");
    input.addEventListener("click", () => {
        element.classList.remove("error_shown");
    });
});

upload.addEventListener("click", () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener("change", (event) => {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
    upload.removeAttribute("selected");

    var file = imageInput.files[0];
    var data = new FormData();
    data.append("image", file);

    fetch("https://imgur.com", {
        method: "POST",
        headers: {
            Authorization: "Client-ID 546c3639596838b",
        },
        body: data,
    })
    .then((result) => result.json())
    .then((response) => {
        if (response && response.data && response.data.link) {
            var url = response.data.link;
            upload.classList.remove("upload_loading");
            upload.setAttribute("selected", url);
            upload.classList.add("upload_loaded");
        } else {
            alert("Imgur cię blokuje (błąd 429). Zmień internet na telefon!");
            location.reload();
        }
    });
});

