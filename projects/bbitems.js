items = document.getElementsByClassName("Label-sc-15v1nk5-0 gJxZPQ text-darkOnyx-800 leading-sm font-regular text-base");
total_items = 0;
for (item = 0; item < items.length; item++)
{
    item_quantity = items[item].innerText.replace("Qty : ", "");
    total_items += parseInt(item_quantity);
}
alert("There are " + total_items + " items in this order");