**Notes**


# Git

```
git commit -am "Inital Commit"
```

# Website

HTML - Structure

CSS - Style

JavaScript - Interaction

Service - Web service endpoints

Database/Login - Persisted app auth data

WebSocket - Data pushed from server, chat

React - Web framework

# History

Tim Berners Lee - HMTL (Hypertext Markup Transcript Language)

# Technology Stack

Host Name - is a website name like byu.edu
DNS (Domain Name System) - Turns Hostname into IP Address

# Creating a Server
EC2 (Elastic Compute Cloud) - AWS rent a server
Create an instance - make a server
Amazon Machine Image (AMI) - An AMI is a template that contains the software configuration (operating system, application server, and applications) required to launch your instance.

+ used this ami-0b009f6c56cdd83ed for CS260 

Instance Type
+ t- means throttled class so it's slows down if there are lots of people 
+ + use Credit specification select unlimited if want to but be warned someone could spam your server

SSH (Secure Shell Connection) - You can use a key pair to securely connect to your instane

Allow SSH traffic from Anywhere means you will be able to edit access from anywhere

Alow SSH, HTTP, and HTTPS traffic from anywhere.

Click create instance. 

# SSH into your server
`ssh -i [key pair file] ubuntu@[ip address]`

You may get a warning that your key pair file permissions are too open. If so then you can restrict the permissions on your file so that they are not accessible to all users by running the chmod console command:

`chmod  600 [key pair file]`

As it connects to the server it might warn you that it hasn't seen this server before. You can confidently say yes since you are sure of the identity of this server.

Exit by `exit`

# Keeping Same public IP address**
You can stop your server at any time. Don't confuse this with terminating your server which completely destroys it. Stopping your server just powers down the device. This is nice because you don't have to pay for it while it is stopped. However, every time you stop and start your server, it will be assigned a new public IP address. It is important to keep the same public IP address so that you, and others, can always browse to the same place. More importantly, when you create your domain name, you can assign it to an address that never changes.

You have two choices in order to keep the same public IP address:

Never stop your server.
Assign an elastic IP address to your server so that it keeps the same address even if you stop it.
Your first elastic IP address is free. However, the catch is that it is only free while the server instance it is assigned to is running. While your server is not running you are charged $0.005/hr. This is the same cost for running a t3.nano server instance. So if you assign an elastic IP address, you don't save any money unless you running a more powerful instance, and are stopping your instance when you, or the TAs, don't need it.

We would suggest that you do both options. Keep your server running and associate an elastic IP. That way if you do need to reboot it for some reason, you will still keep the same IP address, and it doesn't cost you anything more either way.

Here is how you assign an elastic IP address to your server instance.

Open the AWS console in your browser and log in.

Navigate to the EC2 service.

From the menu on the left select Network & Security|Elastic IPs.

Press the Allocate Elastic IP address button.

Press the Allocate button.

Select the newly displayed allocated address and press the Actions button.

Select the Associate Elastic IP address option.

Click on the Instance box and select your server instance.

Press Associate.

# Manage your DNS records
Now that you own a domain name you can use it to create DNS records that will map domain names to IP addresses (A records) or other domain names (CNAME records). For the purposes of this class, you want your root domain name, and any subdomain of your root domain, to map to the IP address of the web server you created previously.

You will need the public IP address for your server. You can get the public IP address by opening the AWS browser console and viewing the details of your server on the EC2 service page.

Open the AWS console in your browser and log in.
Navigate to the Route 53 service.
Select the Hosted zones option from the menu on the left.
You should see your domain name listed here. If it doesn't then the registration did not complete, or it is still pending. In that case go review the information found under Domains > Pending requests.
Click on your domain name to view the details. This should display existing DNS records with types such as NS, and SOA.
First, create the root domain DNS record. This will associate your domain name with your server's IP address and allow you to use your domain name in the browser to navigate to your server.
Press the Create record button.
In the Value box enter the public IP address of your server.
Press Create records
A new A type record should appear in your list of records that represents the root domain name and your server's public IP address.
Next we will create a DNS record that will map to your server for any subdomain of your root domain name. This is possible because DNS allows you to specify wildcards for a DNS record.
Press the Create record button.
In the Record name box enter the text *. This wildcard represents that any subdomain will match this record, so long as it is not explicitly defined by another DNS record.
In the Value box enter the public IP address of your server.
Press Create records
A new A type record should appear in your list of records that represents the wildcard subdomain name and your server's public IP address.

# Caddy
Documentation - https://caddyserver.com/docs/caddyfile
Web Service that listens for incoming HTTP requests. Caddy then either serves up the requested static files or routes the request to another web service. This ability to route requests is called a gateway, or reverse proxy, and allows you to expose multiple web services (i.e. your project services) as a single external web service (i.e. Caddy). Caddy handles web certificates.

For our work we are using the web service Caddy to act as a gateway to our different services and to host our static web application files. Caddy has ACME support built into it by default, and so all you need to do is configure Caddy with the domain name for your web server. Here are the steps to take.

+ Use the ssh console program to shell into your production environment server.
+ Edit Caddy's configuration (Caddyfile) file found in the ubuntu user's home directory.

+ Modify the Caddy rule for handling requests to port 80 (HTTP), to instead handle request for your domain name. By not specifying a port the rule will serve up files using port 443 (HTTPS), and any request to port 80 will automatically redirect the browser to port 443. Replace :80 with your domain name (e.g. myfunkychickens.click). Make sure that you delete the colon.

Save the file and exit
`sudo service caddy restart`

Note - Make Sure the spacing is right in the Caddy file there should be a space after the domain name and before the bracket

# Console

echo - Output the parameters of the command

cd - Change directory

mkdir - Make directory

rmdir - Remove directory

rm - Remove file(s)

mv - Move file(s)

cp - Copy files

ls - List files

curl - Command line client URL browser

grep - Regular expression search

find - Find files

top - View running processes with CPU and memory usage

df - View disk statistics

cat - Output the contents of a file

less - Interactively output the contents of a file

wc - Count the words in a file

ps - View the currently running processes

kill - Kill a currently running process

sudo - Execute a command as a super user (admin)

ssh - Create a secure shell on a remote computer

scp - Securely copy files to a remote computer

history - Show the history of commands

ping - Check if a website is up

tracert - Trace the connections to a website

dig - Show the DNS information for a domain

man - Look up a command in the manual

You can also chain the input and output of commands using special characters

`|` - Take the output from the command on the left and pipe, or pass, it to the command on the right

`>` - Redirect output to a file. Overwrites the file if it exists

`>>` - Redirect output to a file. Appends if the file exists

#VIM 

`:h`	help

`i`	enter insert mode. This will allow you to type and delete text. Use ESC to exit insert mode. No other commands will work while in insert mode.

`u`	undo

`CTRL-r`	redo

`gg`	go to beginning of file

`G`	go to end of file

`/`	search for text that you type after /

`n`	next search match

`N`	previous search match

`v`	visually select text

`y`	yank or copy selected text to clipboard

`p`	paste clipboard

`CTRL-wv`	Split window vertically

`CTRL-ww`	Toggle windows

`CTRL-wq`	Close current window

`:e`	Open a file. Type ahead available. If you open a directory you can navigate it in the window

`:w`	write file (save)

`:q`	quit. Use `:q!` to exit without saving

# HTML

HTML Elements
+ html element represents the top level page structure
+ head element contains metadata about the page and the page title
+ body element represents the content structure
+ main element represents the main content structure, as opposed to things like headers, footers, asides, and navigation content.

Examples

`<> </>` a starter and a closer is an element

`<!-- Comment -->`

`<!DOCTYPE html>` States the version HTML5

`<html>` Boundary around the whole thing

lang = “en” attribute

`<head>` Items that won’t render

`<title>` Puts the title on the Tab Name

`<body>` Body of the Document

`<header>`' Header Content

`<main>` main content on the page

`<footer>` Footer content

`<section>` a section of main

`<div>` a block division of content

`<span>` An inline span of content

`<p>` Paragraph 

`<img>` Image Tag

alt accessibility tells what image is
src url for an image 
height, width
`<a>` Link to Click

href hyperlink reference
`<h(1-9)>` Header 

`<table>` table

`<ol>|<ul>` ordered or unordered lists

+ [Structure Example](https://codepen.io/leesjensen/pen/GRGBqbw)
+ [Input Example](https://codepen.io/leesjensen/pen/dyVdNej)

Attributes
+ id attribute gives unique ID to the element
+ class attribute designates the element as being classified into a named group

A web server will look for an index.html

# HTML Media

**Image**

`<img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />`

alt Element decribes image

**Audio**

`<audio controls src="testAudio.mp3"></audio>`

controls attribute allows user to control audio
autoplay attribute starts audio as soon as audio loads
loop attribute keeps play over and over

**Audio**

`<video controls width="300" crossorigin="anonymous">
  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
</video>`

controls attribute allows user to control video
autoplay attribute starts audio as soon as video loads

**Internal Media**
SVG is an extremely powerful and widely supported way to render graphics inline in your HTML.

# Deploy Files
Using Shell Script

./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s simon

# Cascading Style Sheets

Functionally, CSS is primarily concerned with defining **rulesets**, or simply **rules**. A rule is comprised of a **selector** that selects the elements to apply the rule to, and one or more **declarations** that represent the **property** to style with the given **property value**.

```
p {
  font-family: sans-serif;
  font-size: 2em;
  color: navy;
  text-shadow: 3px 3px 1px #cccccc;
}
```

The selector `p` selects all paragraph elements in the HTML document. The four specified declarations then: 1. change the font to use a sans-serif font, 2. increase the font size to be twice as big as the default font, 3. change the text color to be navy, and 4. create a gray shadow for the text. The result looks like this.

Associate CSS with HTML
`<link rel="stylesheet" href="styles.css" />`

**Box Model**
+ Content Box
+ Padding
+ Border
+ Margin

# CSS Selectors

**Element Type Selectors**

```
section h2 {
  color: #004400;
}
```

**Combinators**

If you wanted to change the color of the second level headings (h2), but we only want to do that within the sections for each department. 


Any h2 that is a descendant of a section

```
section h2 {
  color: #004400;
}
```

Any p that is a direct child of a section

```
section > p
```

Any p that has a div sibling

```
	div ~ p
```

Any p that has an adjacent div sibling

```
	div + p
```

**Class Selector**

```
.class_name
```

**ID Selector**

```
#id
```

**Attribute Selector**

a[href]

**Pseudo Selector**
section:hover

# CSS Units

px	The number of pixels

pt	The number of points (1/72 of an inch)

in	The number of inches

cm	The number of centimeters

%	A percentage of the parent element

em	A multiplier of the width of the letter m in the parent's font

rem	A multiplier of the width of the letter m in the root's font

ex	A multiplier of the height of the element's font

vw	A percentage of the viewport's width

vh	A percentage of the viewport's height

vmin	A percentage of the viewport's smaller dimension

vmax	A percentage of the viewport's larger dimension

# CSS Fonts

In addition to referencing standard fonts found on the user's computer you can specify a font that you provide with your application. That way your application is guaranteed to always look the same. In order to have the browser load a font you use the @font-face rule and provide the font name and source location.

```
@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.ttf');
}
```

If you do not want to host font files on your server, then you can load them from a font provider. ([Google Fonts](https://fonts.google.com/))

```
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');
```

# CSS Animation

You create CSS animations using the animation properties and defining keyframes for what the element should look like at different times in the animation.

```
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}

@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
```

# CSS Responsive Design

The CSS display property allows you to change how an HTML element is displayed by the browser. The common options for the display property include the following.

none	Don't display this element. The element still exists, but the browser will not render it.

block	Display this element with a width that fills its parent element. A p or div element has block display by default.

inline	Display this element with a width that is only as big as its content. A b or span element has inline display by default.

flex	Display this element's children in a flexible orientation.

grid	Display this element's children in a grid orientation.

[Example](https://codepen.io/leesjensen/pen/RwBOPjv)

**Viewport meta tag**
`<meta name="viewport" content="width=device-width,initial-scale=1" />`

# Float
The float css property moves an element to the left or right of its container element and allows inline elements to wrap around it. For example, if we had an aside element followed by a large paragraph of text, we could create the following CSS rule in order to cause the text to wrap around the aside.

```
aside {
  float: right;
  padding: 3em;
  margin: 0.5em;
  border: black solid thin;
}
```

# Media Queries
We can use the @media selector to tell us which side of the screen (technically the viewport) is the longest. A media query takes one or more predicates separated by boolean operators. In our case we simply want to know if the screen is oriented in portrait mode (short side on top) or not. If it is then we transform all of our div elements by rotating them 270 degrees.

```
@media (orientation: portrait) {
  div {
    transform: rotate(270deg);
  }
}
```

[Example 1](https://codepen.io/leesjensen/pen/rNKZOva)
[Example 2](https://codepen.io/leesjensen/pen/NWzLGmJ)

# CSS Grid
The grid display layout is useful when you want to display a group of child elements in a responsive grid. We start with a container element that has a bunch of child elements.

```
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```

We turn this into a responsive grid by including a CSS display property with the value of grid on the container element. This tells the browser that all of the children of this element are to be displayed in a grid flow. The grid-template-columns property specifies the layout of the grid columns. We set this to repeatedly define each column to auto-fill the parent element's width with children that are resized to a minimum of 300 pixels and a maximum of one equal fractional unit (1fr) of the parents total width. A fractional unit is dynamically computed by splitting up the parent element's width into equal parts. Next, we fix the height of the rows to be exactly 300 pixels by specifying the gird-auto-rows property. Finally, we finish off the grid configuration by setting the grid-gap property to have a gap of at least 1 em between each grid item.

[Example](https://codepen.io/leesjensen/pen/GRGXoWP)

# CSS Flex
The flex display layout is useful when you want to partition your application into areas that responsively move around as the window resizes or the orientation changes

```
body {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
}

header {
  flex: 0 80px;
  background: hsl(223, 57%, 38%);
}

footer {
  flex: 0 30px;
  background: hsl(180, 10%, 10%);
}

main {
  flex: 1;
  display: flex;
  flex-direction: row;
}
```

To get the division of space for the flexbox children correct we add the following flex properties to each of the children.

+ header - flex: 0 80px - Zero means it will not grow and 80px means it has a starting basis height of 80 pixels. This creates a fixed size box.
+ footer - flex: 0 30px - Like the header it will not grow and has a height of 30 pixels.
+ main - flex: 1 - One means it will get one fractional unit of growth, and since it is the only child with a non-zero growth value, it will get all the remaining space. Main also gets some additional properties because we want it to also be a flexbox container for the controls and content area. So we set its display to be flex and specify the flex-direction to be row so that the children are oriented side by side.

[Example](https://codepen.io/leesjensen/pen/MWOVYpZ)

# CSS Framework
Allows a way for people to just copy and past code. Bootstrap is the most popular.

```
<link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
```

+ CDN (Content Delivery Network) is a system of distributed servers that work together to deliver web content, such as images, videos, stylesheets, and scripts, to users based on their geographic location.

## JavaScript

Known as ECMAScript

Adding JavaScript to HTML

**index.js**

```
function sayHello() {
  console.log('hello');
}
```

**index.html**

```
<head>
  <script src="javascript.js"></script>
</head>
<body>
  <button onclick="sayHello()">Say Hello</button>
  <button onclick="sayGoodbye()">Say Goodbye</button>
  <script>
    function sayGoodbye() {
      alert('Goodbye');
    }
  </script>
</body>
```

# Debounce Function

The point of a debounce function is to only execute a specified function once within a given time window. Any requests to execute the debounce function more frequently than this will case the time window to reset.

```
function debounce(windowMs, windowFunc) {
  let timeout;
  return function () {
    console.log('scroll event');
    clearTimeout(timeout);
    timeout = setTimeout(() => windowFunc(), windowMs);
  };
}

window.addEventListener(
  'scroll',
  debounce(500, () => {
    console.log('Executed an expensive calculation');
  })
);
```

# Document Object Model (DOM)

```
function displayElement(el) {
  console.log(el.tagName);
  for (const child of el.children) {
    displayElement(child);
  }
}

displayElement(document);
```

```
const listElements = document.querySelectorAll('p');
for (const el of listElements) {
  console.log(el.textContent);
}
```

Add 

```
function insertChild(parentSelector, text) {
  const newChild = document.createElement('div');
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}

insertChild('#courses', 'new course');
```

Delete

```
function deleteElement(elementSelector) {
  const el = document.querySelector(elementSelector);
  el.parentElement.removeChild(el);
}

deleteElement('#courses div');
```