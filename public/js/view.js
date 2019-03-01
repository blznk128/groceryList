$(document).ready(function() {
    let newItem = $("input.new-item");
    let itemContainer = $(".item-container")

    $(document).on("click", "button.delete", deleteItem);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".item-item", editItem);
    $(document).on("keyup", ".item-item", finishEdit);
    $(document).on("blur", ".item-item", cancelEdit);
    $(document).on("submit", "#item-form", insertItem);

    let items = [];

    getItems();

    function readyRows() {
        itemContainer.empty();
        let addRows = [];
        for (var i = 0; i < items.length; i++) {
            addRows.push(createNewRow(items[i]));
        }
        itemContainer.prepend(addRows);
    }

    function getItems() {
        $.get("/api/items", function(data) {
          items = data;
          readyRows();
        });
      }

    function deleteItem(event) {
        event.stopPropagation();
        let id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/items/" + id
        }).then(getItems);
    }

    function editItem() {
        let currentItem = $(this).data("item");
        $(this).children("input.edit").val(currentItem.text);
        $(this).children("input.edit").show();
        $(this).children("input.edit").focus();
    }

    function toggleComplete(event) {
        event.stopPropagation();
        let item = $(this).parent().data("item");
        item.complete = !item.complete;
        updateItem(item);
    }

    function finishEdit(event) {
        let updatedItem = $(this).data("item");
        if (event.which === 13) {
            updatedItem.text = $(this).children("input").val().trim();
            $(this).blur();
            updatedItem(updatedItem)
        }
    }

    function updateItem(item) {
        $.ajax ({
            method: "PUT",
            url: "/api/items",
            data: item
        }).then(getItems);
    }

    function cancelEdit() {
        let currentItem = $(this).data("item");
        if (currentItem) {
            $(this).children().hide();
            $(this).children("input.edit").val(currentItem.text);
            $(this).children("span").show();
            $(this).children("button").show();
        }
    }

    function createNewRow(item) {
        let newInputItem = $(
                [
                "<li class='list-group-item item-item'>",
                "<span>",
                item.text ,
                "</span>" + "<br>",
                "<input type='text' class='edit' style='display: none;'>",
                "<button class='delete btn btn-danger'>x</button>",
                "<button class='complete btn btn-primary'>✓</button>",
                "</li>"
                ].join("")
          );
          newInputItem.find("button.delete").data("id", item.id);
          newInputItem.find("input.edit").css("display", "none");
          newInputItem.data("item", item);
          if (item.complete) {
            newInputItem.find("span").css("text-decoration", "line-through");
          }
          return newInputItem;
    }

    function insertItem(event) {
        event.preventDefault();
        let item = {
            text: newItem.val().trim(),
            complete: false
        };

        $.post("/api/items", item, getItems);
        newItem.val("");
        console.log(newItem)
    }
});

// let newInputItem = $(
//     [
//     "<li class='list-group-item item-item'>",
//     "<span>",
//     item.text ,
//     "</span>",
//     "<input type='text' class='edit' style='display: none;'>",
//     "<button class='delete btn btn-danger'>x</button>",
//     "<button class='complete btn btn-primary'>✓</button>",
//     "</li>"
//     ].join("     ")
// );