var check_banner = setInterval(function()
{
    body_div_elements = document.getElementsByTagName("div");
    for (element_number = 0; element_number < body_div_elements.length; element_number++)
    {
        try
        {
            if (body_div_elements[element_number].children[0].children[0].src == "https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png")
            {
                body_div_elements[element_number].remove();
                stopInterval(check_banner);
                break;
            }
        }
        catch (e)
        {}
    }
}, 10);