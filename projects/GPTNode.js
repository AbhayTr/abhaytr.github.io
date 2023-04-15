/*

Welcome to GPTNode!

GPTNode is a component of GPTFriend, your friend who lives in your phone and thinks on ChatGPT.
This is the source code for the JS App to connect ChatGPT with GPTFriend.

© Abhay Tripathi

*/

let chatgpt_bubble = "markdown prose w-full break-words dark:prose-invert dark";
let error_bubble = "mb-3 block text-xs md:mb-auto";

let input_bubble = document.getElementsByClassName("m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0")[0];
let send_button = document.getElementsByClassName("absolute p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40")[0];
send_button.disabled = false;

function sendPrompt(prompt)
{
    if (send_button.children[0].childElementCount == 3 || send_button == undefined || send_button.style.display == "none")
    {
        return false;
    }
    let currentEntry = "";
    var currentPos = 0;
    var writePrompt = setInterval(function()
    {
        currentEntry += prompt[currentPos];
        input_bubble.value += prompt[currentPos];
        if (currentEntry == prompt)
        {
            send_button.click();
            clearInterval(writePrompt);
        }
        else
        {
            currentPos++;
        }
    }, 100);
    return true;
}

function nReplies()
{
    return document.getElementsByClassName(chatgpt_bubble).length;
}

function getReply()
{
    if (nReplies() == 0)
    {
        return "";
    }
    return document.getElementsByClassName(chatgpt_bubble)[nReplies() - 1].innerText;
}

function replyFinished()
{
    return send_button.children[0].childElementCount == 2;
}

function errorOccured()
{
    return document.getElementsByClassName("mb-3 block text-xs md:mb-auto")[0] != undefined;
}

try
{
    let address = prompt("Enter GPTFriend Address:");
    if (address != null)
    {
        var allowTab = null;
        if (localStorage[address] == undefined)
        {
            alert("In the next upcoming tab, please click on 'advanced' button and click on the 'proceed' button to allow connection b/w GPTFriend and GPTNode. Don't worry, your data is safe! Once you do that and see the 'Upgrade failed' message, close the tab.");
            allowTab = window.open("https://" + address + ":7777");
        }
        var checkTabClose = setInterval(function()
        {
            if (localStorage[address] != undefined || allowTab.closed)
            {
                let gptFriend = new WebSocket("wss://" + address + ":7777");
                var repliesLength = 0;
                var replying = false;
                var sentences = [];

                gptFriend.onopen = function()
                {
                    alert("GPTNode is active and connected to GPTFriend!");
                    console.log("GPTNode is active and connected to GPTFriend!");
                    if (localStorage[address] == undefined)
                    {
                        localStorage[address] = "1";
                    }
                }

                gptFriend.onmessage = function(prompt)
                {
                    repliesLength = nReplies();
                    if (sendPrompt(prompt.data))
                    {
                        var checkMsgs = setInterval(function()
                        {
                            if (replying)
                            {
                                currentReply = getReply();
                                rFinished = replyFinished();
                                if (rFinished)
                                {
                                    currentReply += ".";
                                }
                                currentSentences = currentReply.match(/[^\.!\?:,]+[\.!\?:,]+/g);
                                if (currentSentences != null)
                                {
                                    if (sentences == [])
                                    {
                                        sentences = currentSentences;
                                    }
                                    else
                                    {
                                        currentSentences.reverse();
                                        for (i = 0; i < sentences.length; i++)
                                        {
                                            currentSentences.pop();
                                        }
                                        currentSentences.reverse();
                                    }
                                    for (j = 0; j < currentSentences.length; j++)
                                    {
                                        gptFriend.send(currentSentences[j]);
                                        sentences.push(currentSentences[j]);
                                    }
                                    currentSentences = [];
                                }
                                if (rFinished)
                                {
                                    if (currentSentences != [] && currentSentences != null)
                                    {
                                        gptFriend.send(currentSentences.join(" "));
                                    }
                                    replying = false;
                                    sentences = [];
                                    gptFriend.send("[D]");
                                    clearInterval(checkMsgs);
                                }
                                if (errorOccured())
                                {
                                    if (currentSentences != [] && currentSentences != null)
                                    {
                                        gptFriend.send(currentSentences.join(" "));
                                    }
                                    replying = false;
                                    sentences = [];
                                    gptFriend.send("[E]");
                                    alert("ChatGPT has crashed. Please reload the website and try again.");
                                    console.log("ChatGPT has crashed. Please reload the website and try again.");
                                    clearInterval(checkMsgs);
                                }
                            }
                            else if (nReplies() != repliesLength)
                            {
                                replying = true;
                            }
                        }, 1000);
                    }
                    else
                    {
                        gptFriend.send("[B]");
                        alert("ChatGPT is currently busy. Please try again after some time.");
                        console.log("ChatGPT is currently busy. Please try again after some time.");
                    }
                }

                gptFriend.onerror = function(error)
                {
                    alert("Unable to connect to GPTFriend. Please reload the website and try again.");
                    console.log("Unable to connect to GPTFriend. Please reload the website and try again.");
                }

                gptFriend.onclose = function(error)
                {
                    alert("GPTFriend connection has closed. Please reload the website, reopen the app and try again.");
                    console.log("GPTFriend connection has closed. Please reload the website, reopen the app and try again.");
                }
                clearInterval(checkTabClose);
            }
        }, 1);
    }
    else
    {
        alert("Empty address entered. Reload the page and try again.");
        console.log("Empty address entered. Reload the page and try again.");
    }
}
catch (e)
{
    alert("Something went wrong. Please reload the website and try again.");
    console.log("Something went wrong. Please reload the website and try again.");
}