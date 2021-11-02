items = document.getElementsByClassName("uiv2-quantity-price");
total_items = 0;
for (item = 0; item < items.length; item++)
{
    item_quantity = items[item].innerHTML;
    if (items[item].parentElement.parentElement.className == "uiv2-griditems-offers" || items[item].parentElement.parentElement.className == "uiv2-griditems-details")
    {
      total_items += parseInt(item_quantity);
    }
}
alert("There are " + total_items + " items in this order");