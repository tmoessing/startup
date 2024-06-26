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

## The Internet

use dig to get IP address

Once you have the IP address, you connect to the device it represents by first asking for a connection route to the device. A connection route consists of many hops across the network until the destination is dynamically discovered and the connection established. With the connection the transport and application layers start exchanging data.

You can determine the hops in a connection using traceroute

The actual sending of data across the internet uses the TCP/IP model. This is a layered architecture that covers everything from the physical wires to the data that a web application sends. At the top of the TCP/IP protocol is the application layer. It represents user functionality, such as the web (HTTP), mail (SMTP), files (FTP), remote shell (SSH), and chat (IRC). Underneath that is the transport layer which breaks the application layer's information into small chunks and sends the data. The actual connection is made using the internet layer. This finds the device you want to talk to and keeps the connection alive. Finally, at the bottom of the model is the link layer which deals with the physical connections and hardware.

- Application	HTTPS	Functionality like web browsing

- Transport	TCP	Moving connection information packets

- Internet	IP	Establishing connections

- Link	Fiber, hardware	Physical connections

A web server is a computing device that is hosting a web service that knows how to accept incoming internet connections and speak the HTTP application protocol.

Since it is so easy to build web services it is common to find multiple web services running on the same computing device. The trick is exposing the multiple services in a way that a connection can be made to each of them. Every network device allows for separate network connections by referring to a unique port number. Each service on the device starts up on a different port. In the example above, the go web service was using port 80. So you could just have a user access each service by referring to the port it was launched on. However, this makes it difficult for the user of the services to remember what port matches to which service. To resolve this we introduce a service gateway, or sometimes called a reverse proxy, that is itself a simple web service that listens on the common HTTPS port 443. The gateway then looks at the request and maps it to the other services running on a different ports.

## Domain

Every DNS server in the world references a few special DNS servers that are considered the authoritative name servers for associating a domain name with an IP address.

address (A) and the canonical name (CNAME) records. An A record is a straight mapping from a domain name to IP address. A CNAME record maps one domain name to another domain name. This acts as a domain name alias. You would use a CNAME to do things like map byu.com to the same IP address as byu.edu so that either one could be used.

## URL

```
https://byu.edu:443/cs/260/student?filter=accepted#summary
<scheme>://<domain name>:<port>/<path>?<parameters>#<anchor>
```

- Scheme	https	The protocol required to ask for the resource. For web applications, this is usually HTTPS. But it could be any internet protocol such as FTP or MAILTO.

- Domain name	byu.edu	The domain name that owns the resource represented by the URL.

- Port	3000	The port specifies the numbered network port used to connect to the domain server. Lower number ports are reserved for common internet protocols, higher number ports can be used for any purpose. The default port is 80 if the scheme is HTTP, or 443 if the scheme is HTTPS.

- Path	/school/byu/user/8014	The path to the resource on the domain. The resource does not have to physically be located on the file system with this path. It can be a logical path representing endpoint parameters, a database table, or an object schema.

- Parameters	filter=names&highlight=intro,summary	The parameters represent a list of key value pairs. Usually it provides additional qualifiers on the resource represented by the path. This might be a filter on the returned resource or how to highlight the resource. The parameters are also sometimes called the query string.

- Anchor	summary	The anchor usually represents a sub-location in the resource. For HTML pages this represents a request for the browser to automatically scroll to the element with an ID that matches the anchor. The anchor is also sometimes called the hash, or fragment ID.


- 20	File Transfer Protocol (FTP) for data transfer

- 22	Secure Shell (SSH) for connecting to remote devices

- 25	Simple Mail Transfer Protocol (SMTP) for sending email

- 53	Domain Name System (DNS) for looking up IP addresses

- 80	Hypertext Transfer Protocol (HTTP) for web requests

- 110	Post Office Protocol (POP3) for retrieving email

- 123	Network Time Protocol (NTP) for managing time

- 161	Simple Network Management Protocol (SNMP) for managing network devices such as routers or printers

- 194	Internet Relay Chat (IRC) for chatting

- 443	HTTP Secure (HTTPS) for secure web requests

## HTTP

Hypertext Transfer Protocol (HTTP) is how the web talks. When a web browser makes a request to a web server it does it using the HTTP protocol. In previous instruction we discussed how to use HTTP. Now, we will talk about the internals of HTTP. Just like becoming fluent in a foreign language makes a visit to another country more enjoyable, understanding how to speak HTTP helps you communicate effectively when talking on the web.

When a web client (e.g. a web browser) and a web server talk they exchange HTTP requests and responses. The browser will make an HTTP request and the server will generate an HTTP response. You can see the HTTP exchange by using the browser's debugger or by using a console tool like curl. For example, in your console you can use curl to make the following request.

## Request

The HTTP request for the above command would look like the following.

```
GET /hypertext/WWW/Helping.html HTTP/1.1
Host: info.cern.ch
Accept: text/html
An HTTP request has this general syntax.
```

```
<verb> <url path, parameters, anchor> <version>
[<header key: value>]*
[

  <body>
]
```

## Response 

```
HTTP/1.1 200 OK
Date: Tue, 06 Dec 2022 21:54:42 GMT
Server: Apache
Last-Modified: Thu, 29 Oct 1992 11:15:20 GMT
ETag: "5f0-28f29422b8200"
Accept-Ranges: bytes
Content-Length: 1520
Connection: close
Content-Type: text/html

<TITLE>Helping -- /WWW</TITLE>
<NEXTID 7>
<H1>How can I help?</H1>There are lots of ways you can help if you are interested in seeing
the <A NAME=4 HREF=TheProject.html>web</A> grow and be even more useful...
```

An HTTP response has the following syntax.

```
<version> <status code> <status string>
[<header key: value>]*
[

  <body>
]
```


- GET	Get the requested resource. This can represent a request to get a single resource or a resource representing a list of resources.

- POST	Create a new resource. The body of the request contains the resource. The response should include a unique ID of the newly created resource.

- PUT	Update a resource. Either the URL path, HTTP header, or body must contain the unique ID of the resource being updated. The body of the request should contain the updated resource. The body of the response may contain the resulting updated resource.

- DELETE	Delete a resource. Either the URL path or HTTP header must contain the unique ID of the resource to delete.

- OPTIONS	Get metadata about a resource. Usually only HTTP headers are returned. The resource itself is not returned.

## Status Codes

It is important that you use the standard HTTP status codes in your HTTP responses so that the client of a request can know how to interpret the response. The codes are partitioned into five blocks.

- 1xx - Informational.

- 2xx - Success.

- 3xx - Redirect to some other location, or that the previously cached resource is still valid.

- 4xx - Client errors. The request is invalid.

- 5xx - Server errors. The request cannot be satisfied due to an error on the server.


- 100	Continue	The service is working on the request

- 200	Success	The requested resource was found and returned as appropriate.

- 201	Created	The request was successful and a new resource was created.

- 204	No Content	The request was successful but no resource is returned.

- 304	Not Modified	The cached version of the resource is still valid.

- 307	Permanent redirect	The resource is no longer at the requested location. The new location is specified in the response location header.

- 308	Temporary redirect	The resource is temporarily located at a different location. The temporary location is specified in the response location header.

- 400	Bad request	The request was malformed or invalid.

- 401	Unauthorized	The request did not provide a valid authentication token.

- 403	Forbidden	The provided authentication token is not authorized for the resource.

- 404	Not found	An unknown resource was requested.

- 408	Request timeout	The request takes too long.

- 409	Conflict	The provided resource represents an out of date version of the resource.

- 418	I'm a teapot	The service refuses to brew coffee in a teapot.

- 429	Too many requests	The client is making too many requests in too short of a time period.

- 500	Internal server error	The server failed to properly process the request.

- 503	Service unavailable	The server is temporarily down. The client should try again with an exponential back off.

## Headers

HTTP headers specify metadata about a request or response. This includes things like how to handle security, caching, data formats, and cookies. Some common headers that you will use include the following.

- Authorization	Bearer bGciOiJIUzI1NiIsI	A token that authorized the user making the request.

- Accept	image/*	The format the client accepts. This may include wildcards.

- Content-Type	text/html; charset=utf-8	The format of the content being sent. These are described using standard MIME types.

- Cookie	SessionID=39s8cgj34; csrftoken=9dck2	Key value pairs that are generated by the server and stored on the client.

- Host	info.cern.ch	The domain name of the server. This is required in all requests.

- Origin	cs260.click	Identifies the origin that caused the request. A host may only allow requests from specific origins.

- Access-Control-Allow-Origin	https://cs260.click	Server response of what origins can make a request. This may include a wildcard.

- Content-Length	368	The number of bytes contained in the response.

- Cache-Control	public, max-age=604800	Tells the client how it can cache the response.

- User-Agent	Mozilla/5.0 (Macintosh)	The client application making the request.

## Cookies

HTTP itself is stateless. This means that one HTTP request does not know anything about a previous or future request. However, that does not mean that a server or client cannot track state across requests. One common method for tracking state is the cookie. Cookies are generated by a server and passed to the client as an HTTP header.

This allows the server to remember things like the language preference of the user, or the user's authentication credentials. A server can also use cookies to track, and share, everything that a user does. However, there is nothing inherently evil about cookies; the problem comes from web applications that use them as a means to violate a user's privacy or inappropriately monetize their data.

## Node Package Manager
While you could write all of the JavaScript for everything you need, it is always helpful to use preexisting packages of JavaScript for implementing common tasks. To load a package using Node.js you must take two steps. First install the package locally on your machine using the Node Package Manager (NPM), and then include a require statement in your code that references the package name. NPM is automatically installed when you install Node.js.

NPM knows how to access a massive repository of preexisting packages. You can search for packages on the NPM website. However, before you start using NPM to install packages you need to initialize your code to use NPM. This is done by creating a directory that will contain your JavaScript and then running npm init. NPM will step you through a series of questions about the project you are creating. You can press the return key for each of questions if you want to accept the defaults. If you are always going to accept all of the defaults you can use npm init -y and skip the Q&A.

If you list the files in the directory you will notice that it has created a file named package.json. This file contains three main things: 1) Metadata about your project such as its name and the default entry JavaScript file, 2) commands (scripts) that you can execute to do things like run, test, or distribute your code, and 3) packages that this project depends upon. The following shows what your package.json looks like currently. It has some default metadata and a simple placeholder script that just runs the echo command when you execute npm run test from the console.

```
{
  "name": "npmtest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

Can use npm install

```
{
  "name": "npmtest",
  "version": "1.0.0",
  "description": "Simple Node.js demo",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "dev": "node index.js"
  },
  "dependencies": {
    "give-me-a-joke": "^0.5.1"
  }
}
```

the index.js to run looks like

```
const giveMeAJoke = require('give-me-a-joke');
giveMeAJoke.getRandomDadJoke((joke) => {
  console.log(joke);
});
```

Steps

- Create your project directory

- Initialize it for use with NPM by running npm init -y

- Make sure .gitignore file contains node_modules

- Install any desired packages with npm install <package name here>

- Add require('<package name here>') to your application's JavaScript

- Use the code the package provides in your JavaScript

- Run your code with node index.js

## Creating a web service
http is built in

```
const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Hello Node.js! [${req.method}] ${req.url}</h1>`);
  res.end();
});

server.listen(8080, () => {
  console.log(`Web service listening on port 8080`);
});
```

This code uses the Node.js built-in http package to create our HTTP server using the http.createServer function along with a callback function that takes a request (req) and response (res) object. That function is called whenever the server receives an HTTP request. In our example, the callback always returns the same HTML snippet, with a status code of 200, and a Content-Type header, no matter what request is made. Basically this is just a simple dynamically generated HTML page. A real web service would examine the HTTP path and return meaningful content based upon the purpose of the endpoint.

The server.listen call starts listening on port 8080 and blocks until the program is terminated.

## Express

Express provides support:

- Routing requests for service endpoints
- Manipulating HTTP requests with JSON body content
- Generating HTTP responses
- Using middleware to add functionality

```
npm install express
```

```
const express = require('express');
const app = express();

app.listen(8080);
```

With the app object you can now add HTTP routing and middleware functions to the application.

## Defining Routess

HTTP endpoints are implemented in Express by defining routes that call a function based upon an HTTP path. The Express app object supports all of the HTTP verbs as functions on the object. For example, if you want to have a route function that handles an HTTP GET request for the URL path /store/provo you would call the get method on the app.

```
app.get('/store/provo', (req, res, next) => {
  res.send({name: 'provo'});
});
```

The get function takes two parameters, a URL path matching pattern, and a callback function that is invoked when the pattern matches. The path matching parameter is used to match against the URL path of an incoming HTTP request.

The callback function has three parameters that represent the HTTP request object (req), the HTTP response object (res), and the next routing function that Express expects to be called if this routing function wants another function to generate a response.

In our example above we hard coded the store name to be provo. A real store endpoint would allow any store name to be provided as a parameter in the path. Express supports path parameters by prefixing the parameter name with a colon (:). Express creates a map of path parameters and populates it with the matching values found in the URL path. You then reference the parameters using the req.params object. Using this pattern you can rewrite our getStore endpoint as follows.

```
app.get('/store/:storeName', (req, res, next) => {
  res.send({name: req.params.storeName});
});
```

If you wanted an endpoint that used the POST or DELETE HTTP verb then you just use the post or delete function on the Express app object.

```
// Wildcard - matches /store/x and /star/y
app.put('/st*/:storeName', (req, res) => res.send({update: req.params.storeName}));

// Pure regular expression
app.delete(/\/store\/(.+)/, (req, res) => res.send({delete: req.params[0]}));
```

Notice that in these examples the next parameter was omitted. Since we are not calling next we do not need to include it as a parameter. However, if you do not call next then no following middleware functions will be invoked for the request.

## Using middleware
The standard Mediator/Middleware design pattern has two pieces: a mediator and middleware. Middleware represents componentized pieces of functionality. The mediator loads the middleware components and determines their order of execution. When a request comes to the mediator it then passes the request around to the middleware components. Following this pattern, Express is the mediator, and middleware functions are the middleware components.

Express comes with a standard set of middleware functions. These provide functionality like routing, authentication, CORS, sessions, serving static web files, cookies, and logging. Some middleware functions are provided by default, and other ones must be installed using NPM before you can use them. You can also write your own middleware functions and use them with Express.

A middleware function looks very similar to a routing function. That is because routing functions are also middleware functions. The only difference is that routing functions are only called if the associated pattern matches. Middleware functions are always called for every HTTP request unless a preceding middleware function does not call next. A middleware function has the following pattern:

```function middlewareName(req, res, next)```

The middleware function parameters represent the HTTP request object (req), the HTTP response object (res), and the next middleware function to pass processing to. You should usually call the next function after completing processing so that the next middleware function can execute.

As an example of writing your own middleware, you can create a function that logs out the URL of the request and then passes on processing to the next middleware function.

```
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
```

Remember that the order that you add your middleware to the Express app object controls the order that the middleware functions are called. Any middleware that does not call the next function after doing its processing, stops the middleware chain from continuing.

## Error Handling Middleware

You can also add middleware for handling errors that occur. Error middleware looks similar to other middleware functions, but it takes an additional err parameter that contains the error.

```function errorMiddlewareName(err, req, res, next)```
If you wanted to add a simple error handler for anything that might go wrong while processing HTTP requests you could add the following.

```
app.use(function (err, req, res, next) {
  res.status(500).send({type: err.name, message: err.message});
});
```

We can test that our error middleware is getting used by adding a new endpoint that generates an error.

```
app.get('/error', (req, res, next) => {
  throw new Error('Trouble in river city');
});
```

Now if we use curl to call our error endpoint we can see that the response comes from the error middleware.

```
➜ curl localhost:8080/error
{"type":"Error","message":"Trouble in river city"}
```

Putting it all together

Here is a full example of our web service built using Express.

```
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Third party middleware - Cookies
app.use(cookieParser());

app.post('/cookie/:name/:value', (req, res, next) => {
  res.cookie(req.params.name, req.params.value);
  res.send({cookie: `${req.params.name}:${req.params.value}`});
});

app.get('/cookie', (req, res, next) => {
  res.send({cookie: req.cookies});
});

// Creating your own middleware - logging
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// Built in middleware - Static file hosting
app.use(express.static('public'));

// Routing middleware
app.get('/store/:storeName', (req, res) => {
  res.send({name: req.params.storeName});
});

app.put('/st*/:storeName', (req, res) => res.send({update: req.params.storeName}));

app.delete(/\/store\/(.+)/, (req, res) => res.send({delete: req.params[0]}));

// Error middleware
app.get('/error', (req, res, next) => {
  throw new Error('Trouble in river city');
});

app.use(function (err, req, res, next) {
  res.status(500).send({type: err.name, message: err.message});
});

// Listening to a network port
const port = 8080;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
```

## SOP and CORS

Same Origin Policy (SOP)

 Simply stated SOP only allows JavaScript to make requests to a domain if it is the same domain that the user is currently viewing. A request from byu.iinstructure.com for service endpoints that are made to byu.instructure.com would fail because the domains do not match. This provides significant security, but it also introduces complications when building web applications. For example, if you want build a service that any web application can use it would also violate the SOP and fail. In order to address this, the concept of Cross Origin Resource Sharing (CORS) was invented.

 CORS allows the client (e.g. browser) to specify the origin of a request and then let the server respond with what origins are allowed. The server may say that all origins are allowed, for example if they are a general purpose image provider, or only a specific origin is allowed, for example if they are a bank's authentication service. If the server doesn't specify what origin is allowed then the browser assumes that it must be the same origin.

 # 3rd Party Services

When you make requests to your own web services you are always on the same origin and so you will not violate the SOP. However, if you want to make requests to a different domain than the one your web application is hosted on, then you need to make sure that domain allows requests as defined by the Access-Control-Allow-Origin header it returns. For example, if I have JavaScript in my web application loaded from cs260.click that makes a fetch request for an image from the website i.picsum.photos the browser will fail the request with an HTTP status code of 403 and an error message that CORS has blocked the request.

That happens because i.picsum.photos does not return an Access-Control-Allow-Origin header. Without a header the browser assumes that all requests must be made from the same origin.

## Endpoints

Note that service endpoints are often called an Application Programming Interface (API). This is a throwback to old desktop applications and the programming interfaces that they exposed. Sometimes the term API refers to the entire collection of endpoints, and sometimes it is used to refer to a single endpoint.

## RPC

Remote Procedure Calls (RPC) expose service endpoints as simple function calls. When RPC is used over HTTP it usually just leverages the POST HTTP verb. The actual verb and subject of the function call is represented by the function name. For example, deleteOrder or updateOrder. The name of the function is either the entire path of the URL or a parameter in the POST body.

One advantage of RPC is that it maps directly to function calls that might exist within the server. This could also be considered a disadvantage as it directly exposes the inner workings of the service, and thus creates a coupling between the endpoints and the implementation.

## REST

Representational State Transfer (REST) attempts to take advantage of the foundational principles of HTTP. This is not surprising considering the principle author of REST, Roy Fielding, was also a contributor to the HTTP specification. REST HTTP verbs always act upon a resource. Operations on a resource impact the state of the resource as it is transferred by a REST endpoint call. This allows for the caching functionality of HTTP to work optimally. For example, GET will always return the same resource until a PUT is executed on the resource. When PUT is used, the cached resource is replaced with the updated resource.

With REST the updateOrder endpoint would look like the following.

```
PUT /order/2197 HTTP/2

{"date": "20220505"}
```

Where the proper HTTP verb is used and the URL path uniquely identifies the resource. These seem like small differences, but maximizing HTTP pays dividends by making it easy for HTTP infrastructure, such as caching, to work properly.

## GraphQL
GraphQL focuses on the manipulation of data instead of a function call (RPC) or a resource (REST). The heart of GraphQL is a query that specifies the desired data and how it should be joined and filtered. GraphQL was developed to address frustration concerning the massive number of REST, or RPC calls, that a web application client needed to make in order to support even a simple UI widget.

Instead of making a call for getting a store, and then a bunch of calls for getting the store's orders and employees, GraphQL would send a single query that would request all of that information in one big JSON response. The server would examine the query, join the desired data, and then filter out anything that was not wanted.

Here is an example GraphQL query.

query {
  getOrder(id: "2197") {
    orders(filter: {date: {allofterms: "20220505"}}) {
      store
      description
      orderedBy
    }
  }
}
GraphQL helps to remove a lot of the logic for parsing endpoints and mapping requests to specific resources. Basically in GraphQL there is only one endpoint. The query endpoint.

The downside of that flexibility is that the client now has significant power to consume resources on the server. There is no clear boundary on what, how much, or how complicated the aggregation of data is. It also is difficult for the server to implement authorization rights to data as they have to be baked into the data schema. However, there are standards for how to define a complex schema. Common GraphQL packages provide support for schema implementations along with database adaptors for query support.

## Debugging in VS CODE



- ```F5``` - Start Debbuging

- ```F10``` - Step to next line

- ```F11``` - Step into Function Calll

- ```SHIFT-F5```  - Stop Debugging

## Nodemon
The Nodemon package is basically a wrapper around node that watches for files in the project directory to change. When it detects that you saved something it will automatically restart node.

```
npm install -g nodemon
```

Then, because VS Code does not know how to launch Nodemon automatically, you need create a VS Code launch configuration. In VS Code press CTRL-SHIFT-P (on Windows) or ⌘-SHIFT-P (on Mac) and type the command Debug: Add configuration. This will then ask you what type of configuration you would like to create. Type Node.js and select the Node.js: Nodemon setup option. In the launch configuration file that it creates, change the program from app.js to main.js (or whatever the main JavaScript file is for your application) and save the configuration file.

Now when you press F5 to start debugging it will run Nodemon instead of Node.js, and your changes will automatically update your application when you save.

## Development & Production Environments

**Steps**
Continuous integration (CI) processes, checkout the application code, lint it, build it, test it, stage it, test it more, and then finally, if everything checks out, deploy the application to the production environment, and notify the different departments in the company of the release.

Linting is a tool that analyzes sources code to flag programming errors, bugs, stylistic errors. [More Information](https://www.freecodecamp.org/news/what-is-linting-and-how-can-it-save-you-time/)


- ```scp``` secure copy program

## Uploading Files

In order to build storage support into our server, we first install the Multer NPM package to our project. There are other NPM packages that we can chose from, but Multer is commonly used. From your project directory, run the following console command.

```npm install multer```

Multer handles reading the file from the HTTP request, enforcing the size limit of the upload, and storing the file in the uploads directory. Additionally our service code does the following:

- Handles requests for static files so that we can serve up our frontend code.

- Handles errors such as when the 64k file limit is violated.

- Provides a GET endpoint to serve up a file from the uploads directory.

```
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const filetype = file.originalname.split('.').pop();
      const id = Math.round(Math.random() * 1e9);
      const filename = `${id}.${filetype}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 64000 },
});
```

## Data Services

MySQL	Relational queries
Redis	Memory cached objects
ElasticSearch	Ranked free text
MongoDB	JSON objects
DynamoDB	Key value pairs
Neo4J	Graph based data
InfluxDB	Time series data

## Mongo DB

```npm install mongodb```

```
const { MongoClient } = require('mongodb');

const userName = 'holowaychuk';
const password = 'express';
const hostname = 'mongodb.com';

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
```

**Inserting**

```
const collection = client.db('rental').collection('house');

const house = {
  name: 'Beachfront views',
  summary: 'From your bedroom to the beach, no shoes required',
  property_type: 'Condo',
  beds: 1,
};
await collection.insertOne(house);
```

```
scores = [
 { name: 'ryan', score: 3 },
 { name: 'holowaychuk', score: 83 },
];
scoreCollection.insertMany(scores);
```

**Finding**

```
db.house.find()
db.house.find({beds:{$gte:2}})
db.house.find({status:"open",beds:{$lt: 3}})
db.house.find({$or:[beds:{$lt: 3},price:{$lt:1000}]})
db.house.find({summary:/(modern|beach)/i})
```

```
const cursor = collection.find();
const rentals = await cursor.toArray();
rentals.forEach((i) => console.log(i));
```

## Testing Connection

```
client
 .connect()
 .then(() => db.command({ ping: 1 }))
 .then(() => console.log(`Connected`))
 .catch((ex) => {
   console.log(`Error with ${url} because ${ex.message}`);
   process.exit(1);
 });
```

## Storing Credentials

Create a dbConfig.json

```
{
  "hostname": "cs260.abcdefg.mongodb.net",
  "userName": "myMongoUserName",
  "password": "toomanysecrets"
}
```

```
const { MongoClient } = require('mongodb');

const cfg = require('./dbConfig.json');
const url = `mongodb+srv://${cfg.userName}:${cfg.password}@${cfg.hostname}`;

const client = new MongoClient(url);
const scoreCollection = client.db('startup').collection('score');
```

**MAKE SURE TO ADD GITIGNORE**

## Authorization Services

```npm install cookie-parser uuid bcrypt```

To generate a reasonable authentication token we use the uuid package. UUID stands for Universally Unique Identifier, and it does a really good job creating a hard to guess, random, unique ID.

```
const uuid = require('uuid');

token: uuid.v4();
```

To hash our passwords we will use the bcrypt package. 

```
const bcrypt = require('bcrypt');

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await collection.insertOne(user);

  return user;
}
```

## Passing Authentication Tokens

We now need to pass our generated authentication token to the browser when the login endpoint is called, and get it back on subsequent requests. To do this we use HTTP cookies. The cookie-parser package provides middleware for cookies and so we will leverage that.

We import the cookieParser object and then tell our app to use it. When a user is successfully created, or logs in, we set the cookie header. Since we are storing an authentication token in the cookie, we want to make it as secure as possible, and so we use the httpOnly, secure, and sameSite options.

-httpOnly tells the browser to not allow JavaScript running on the browser to read the cookie.

-secure requires HTTPS to be used when sending the cookie back to the server.

-sameSite will only return the cookie to the domain that generated it.

```
const cookieParser = require('cookie-parser');

// Use the cookie parser middleware
app.use(cookieParser());

apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}
```

## Login Endpoint

The login authorization endpoint needs to get the hashed password from the database, compare it to the provided password using bcrypt.compare, and if successful set the authentication token in the cookie. If the password does not match, or there is no user with the given email, the endpoint returns status 401 (unauthorized).

```
app.post('/auth/login', async (req, res) => {
  const user = await getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});
```

## GetMe Endpoint

With everything in place to create credentials and login using the credentials, we can now implement the getMe endpoint to demonstrate that it all actually works. To implement this we get the user object from the database by querying on the authentication token. If there is not an authentication token, or there is no user with that token, we return status 401 (unauthorized).

```
app.get('/user/me', async (req, res) => {
  authToken = req.cookies['token'];
  const user = await collection.findOne({ token: authToken });
  if (user) {
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});
```

## PM2
When you run a program from the console, the program will automatically terminate when you close the console or if the computer restarts. In order to keep programs running after a shutdown you need to register it as a daemon. The term daemon comes from the idea of something that is always there working in the background. Hopefully you only have good daemons running in your background.

We want our web services to continue running as a daemon. We would also like an easy way to start and stop our services. That is what Process Manager 2 (PM2) does.

PM2 is already installed on your production server as part of the AWS AMI that you selected when you launched your server. Additionally, the deployment scripts found with the Simon projects automatically modify PM2 to register and restart your web services. That means you should not need to do anything with PM2. However, if you run into problems such as your services not running, then here are some commands that you might find useful.

- pm2 ls	List all of the hosted node processes

- pm2 monit	Visual monitor

- pm2 start index.js -n simon	Add a new process with an explicit name

- pm2 start index.js -n startup -- 4000	Add a new process with an explicit name and port parameter

- pm2 stop simon	Stop a process

- pm2 restart simon	Restart a process

- pm2 delete simon	Delete a process from being hosted

- pm2 delete all	Delete all processes

- pm2 save	Save the current processes across reboot

- pm2 restart all	Reload all of the processes

- pm2 restart simon --update-env	Reload process and update the node version to the current environment definition

- pm2 update	Reload pm2

- pm2 start env.js --watch --ignore-watch="node_modules"	Automatically reload service when index.js changes

- pm2 describe simon	Describe detailed process information

- pm2 startup	Displays the command to run to keep PM2 running after a reboot.

- pm2 logs simon	Display process logs

- pm2 env 0	Display environment variables for process. Use pm2 ls to get the process ID


## Playwright

As a demonstration of using Playwright, consider the following simplified HTML file containing a button that changes the paragraph text. The button calls a JavaScript function defined in a script element located in the HTML file.

```
<body>
  <p id="welcome" data-testid="msg">Hello world</p>
  <button onclick="changeWelcome()">change welcome</button>
  <script>
    function changeWelcome() {
      const welcomeEl = document.querySelector('#welcome');
      welcomeEl.textContent = 'I feel welcomed';
    }
  </script>
</body>
```

You can now write your first Playwright test. Take the following and paste it over the tests/example.spec.js file that the Playwright install created.

```
import { test, expect } from '@playwright/test';

test('testWelcomeButton', async ({ page }) => {
  // Navigate to the welcome page
  await page.goto('http://localhost:5500/');

  // Get the target element and make sure it is in the correct starting state
  const hello = page.getByTestId('msg');
  await expect(hello).toHaveText('Hello world');

  // Press the button
  const changeBtn = page.getByRole('button', { name: 'change welcome' });
  await changeBtn.click();

  // Expect that the change happened correctly
  await expect(hello).toHaveText('I feel not welcomed');
});
```

This test makes sure you can successfully navigate to the desired page, that the page contains the desired elements, that you can press the button and the text changes as expected.

Before you run the test, you actually need your application running for the test to execute against. You can do this by using the VS Code Live Server extension, or if you are testing a Node.js based service then run npm run start. You can actually add configuration to your tests so that your application is started when your tests run, but for now, just start up your application before you run the test.

To run the test in VS Code, select the Test Explorer tab. You should see your test listed in the explorer. Select the example.spec.ts test and press the play button. This will start the test, launch a browser, run the test code to interact with the browser, and display the result. In this case our test fails because it is expecting the resulting text to be I feel not welcomed when it actually displays I feel welcomed.

The following image should be similar to what you see. You can see the listing of tests on the left and the JavaScript based test in the editor window on the right. When a test fails, the editor window displays a clear description of what went wrong. You can even debug the tests as they execute just like you would any other Node.js based JavaScript execution.


With the ability to run automated UI tests, we now turn our attention to testing on the multitude of various devices. There are several services out there that help with this. One of these is BrowserStack. BrowserStack lets you pick from a long list of physical devices that you can run interactively, or use when driving automated tests with Selenium. The image below only shows a partial list of iPhone devices. BrowserStack also has devices for Android, Mac, and Windows.

## Endpoint Testing

```
mkdir testJest
cd testJest
npm init -y
npm install express
code .
```

```
const app = express();

app.use(express.json());

// Endpoints
app.get('/store/:storeName', (req, res) => {
  res.send({ name: req.params.storeName });
});

app.put('/store/:storeName', (req, res) => {
  req.body.updated = true;
  res.send(req.body);
});

module.exports = app;
```

In order to allow Jest to start up the HTTP server when running tests, we initialize the application a little bit differently than we have in the past. Normally, we would have just started listening on the Express app object after we defined our endpoints. Instead we export the Express app object from our server.js file and then import the app object in the index.js file that is used to run our servic

```
const app = require('./server');

const port = 8080;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
```

To test our endpoints we need another package so that we can make HTTP requests without having to actually send them over the network. This is done with the NPM package called supertest. Go ahead and install this now.

To make an HTTP request you pass the Express app to the supertest request function and then chain on the HTTP verb function that you want to call, along with the endpoint path. You can then chain on as many expect functions as you would like. In the following example we will expect an HTTP status code of 200 (OK), and that the body of the response contains the object that we expect the endpoint to return.

If something goes wrong, the end function will contain an error and we pass the error along to the done function. Otherwise we just call done without the error.

```
const request = require('supertest');
const app = require('./server');

test('getStore returns the desired store', (done) => {
  request(app)
    .get('/store/provo')
    .expect(200)
    .expect({ name: 'provo' })
    .end((err) => (err ? done(err) : done()));
});
```

## Web Socket

HTTP is based on a client-server architecture. A client always initiates the request and the server responds. This is great if you are building a global document library connected by hyperlinks, but for many other use cases it just doesn't work. Applications for notifications, distributed task processing, peer-to-peer communication, or asynchronous events need communication that is initiated by two or more connected devices.

For years, web developers created hacks to work around the limitation of the client/server model. This included solutions like having the client frequently pinging the server to see if the server had anything to say, or keeping client-initiated connections open for a very long time as the client waited for some event to happen on the server. Needless to say, none of these solutions were elegant or efficient.

Finally, in 2011 the communication protocol WebSocket was created to solve this problem. The core feature of WebSocket is that it is fully duplexed. This means that after the initial connection is made from a client, using vanilla HTTP, and then upgraded by the server to a WebSocket connection, the relationship changes to a peer-to-peer connection where either party can efficiently send data at any time.

JavaScript running on a browser can initiate a WebSocket connection with the browser's WebSocket API. First you create a WebSocket object by specifying the port you want to communicate on.

You can then send messages with the send function, and register a callback using the onmessage function to receive messages.

```
const socket = new WebSocket('ws://localhost:9900');

socket.onmessage = (event) => {
  console.log('received: ', event.data);
};

socket.send('I am listening');
```

```
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 9900 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const msg = String.fromCharCode(...data);
    console.log('received: %s', msg);

    ws.send(`I heard you say "${msg}"`);
  });

  ws.send('Hello webSocket');
});
```

## Security Overview

You can see bad actors at work on your very own server by using ssh to open a console to your server and reviewing the authorization log. The authorization log captures all of the attempts to create a session on your server.

```
sudo less +G /var/log/auth.log
```

The last entry in the log will be from your connection to the server.

```
Feb 23 16:26:54 sshd[319071]: pam_unix(sshd:session): session opened for user ubuntu(uid=1000) by (uid=0)
Feb 23 16:26:54 systemd-logind[480]: New session 1350 of user ubuntu.
Feb 23 16:26:54 systemd: pam_unix(systemd-user:session): session opened for user ubuntu(uid=1000) by (uid=0)
```

## Security Terminology


- **Hacking** - The process of making a system do something it's not supposed to do.

- **Exploit** - Code or input that takes advantage of a programming or configuration flaw.

- **Attack Vector** - The method that a hacker employs to penetrate and exploit a system.

- **Attack Surface** - The exposed parts of a system that an attacker can access. For example, open ports (22, 443, 80), service endpoints, or user accounts.

- **Attack Payload** - The actual code, or data, that a hacker delivers to a system in order to exploit it.

- **Input sanitization** - "Cleaning" any input of potentially malicious data.

- **Black box testing** - Testing an application without knowledge of the internals of the application.

- **White box testing** - Testing an application by with knowledge of the source code and internal infrastructure.

- **Penetration Testing** - Attempting to gain access to, or exploit, a system in ways that are not anticipated by the developers.

- **Mitigation** - The action taken to remove, or reduce, a threat.



- **Disruption** - By overloading a system, encrypting essential data, or deleting critical infrastructure, an attacker can destroy normal business operations. This may be an attempt at extortion, or simply be an attempt to punish a business that that attacker does not agree with.

- **Data exfiltration** - By privately extracting, or publicly exposing, a system's data, an attacker can embarrass the company, exploit insider information, sell the information to competitors, or leverage the information for additional attacks.

- **Resource consumption** - By taking control of a company's computing resources an attacker can use it for other purposes such as mining cryptocurrency, gathering customer information, or attacking other systems.

- **Injection:** When an application interacts with a database on the backend, a programmer will often take user input and concatenate it directly into a search query. This allows a hacker can use a specially crafted query to make the database reveal hidden information or even delete the database.

- **Cross-Site Scripting (XSS):** A category of attacks where an attacker can make malicious code execute on a different user's browser. If successful, an attacker can turn a website that a user trusts, into one that can steal passwords and hijack a user's account.

- **Denial of Service:** This includes any attack where the main goal is to render any service inaccessible. This can be done by deleting a database using an SQL injection, by sending unexpected data to a service endpoint that causes the program to crash, or by simply making more requests than a server can handle.

- **Credential Stuffing:** People have a tendency to reuse passwords or variations of passwords on different websites. If a hacker has a user's credentials from a previous website attack, then there is a good chance that they can successfully use those credentials on a different website. A hacker can also try to brute force attack a system by trying every possible combination of password.

- **Social engineering** - Appealing to a human's desire to help, in order to gain unauthorized access or information.

- **Sanitize input data** - Always assume that any data you receive from outside your system will be used to exploit your system. Consider if the input data can be turned into an executable expression, or can overload computing, bandwidth, or storage resources.

- **Logging** - It is not possible to think of every way that your system can be exploited, but you can create an immutable log of requests that will expose when a system is being exploited. You can then trigger alerts, and periodically review the logs for unexpected activity.

- **Traps** - Create what appears to be valuable information and then trigger alarms when the data is accessed.

- **Educate** - Teach yourself, your users, and everyone you work with, to be security minded. Anyone who has access to your system should understand how to prevent physical, social, and software attacks.

- **Reduce attack surfaces** - Do not open access anymore than is necessary to properly provide your application. This includes what network ports are open, what account privileges are allowed, where you can access the system from, and what endpoints are available.

- **Layered security** - Do not assume that one safeguard is enough. Create multiple layers of security that each take different approaches. For example, secure your physical environment, secure your network, secure your server, secure your public network traffic, secure your private network traffic, encrypt your storage, separate your production systems from your development systems, put your payment information in a separate environment from your application environment. Do not allow data from one layer to move to other layers. For example, do not allow an employee to take data out of the production system.

- **Least required access policy** - Do not give any one user all the credentials necessary to control the entire system. Only give a user what access they need to do the work they are required to do.

- **Safeguard credentials** - Do not store credentials in accessible locations such as a public GitHub repository or a sticky note taped to a monitor. Automatically rotate credentials in order to limit the impact of an exposure. Only award credentials that are necessary to do a specific task.

- **Public review** - Do not rely on obscurity to keep your system safe. Assume instead that an attacker knows everything about your system and then make it difficult for anyone to exploit the system. If you can attack your system, then a hacker will be able to also. By soliciting public review and the work of external penetration testers, you will be able to discover and remove potential exploits.

## OWASP

The Open Web Application Security Project (OWASP) is a non-profit research entity that manages the Top Ten list of the most important web application security risks. Understanding, and periodically reviewing, this list will help to keep your web applications secure.

- Broken Access Control

- Cryptographic Failures

- Injection 

- Insecure Design

- Security Misconfiguration

- Vulnerable and Outdated Components

- Identification and Authentication Failures

- Software and Data Integrity Failure

- Security Logging and Monitoring Failures

- Server Side Request Forgery (SSRF)

## Web frameworks React

**React**
React combines JavaScript and HTML into its component format. CSS must be declared outside of the JSX file. The component itself highly leverages the functionality of JavaScript and can be represented as a function or class.

**JSX**

```
import 'hello.css';

const Hello = () => {
  let name = 'world';

  return <p>Hello {name}</p>;
};
```

CSS

```
p {
  color: green;
}
```

React abstracts HTML into a JavaScript variant called JSX. JSX is converted into valid HTML and JavaScript using a preprocessor called Babel. For example, the following is a JSX file. Notice that it mixes both HTML and JavaScript into a single representation.

```
const i = 3;
const list = (
  <ol class='big'>
    <li>Item {i}</li>
    <li>Item {3 + i}</li>
  </ol>
);
```

Babel will convert that into valid JavaScript:

```
const i = 3;
const list = React.createElement(
  'ol',
  { class: 'big' },
  React.createElement('li', null, 'Item ', i),
  React.createElement('li', null, 'Item ', 3 + i)
);
```

The React.createElement function will then generate DOM elements and monitor the data they represent for changes. When a change is discovered, React will trigger dependent changes.

## React Components

React components allow you to modularize the functionality of your application. This allows the underlying code to directly represent the components that a user interacts with. It also enables code reuse as common application components often show up repeatedly.

One of the primary purposes of a component is to generate the user interface. This is done with the component's render function. Whatever is returned from the render function is inserted into the component HTML element.

As a simple example, a JSX file containing a React component element named Demo would cause React to load the Demo component, call the render function, and insert the result into the place of the Demo element.

JSX

```
<div>
  Component: <Demo />
</div>
```
Notice that Demo is not a valid HTML element. The transpiler will replace this tag with the resulting rendered HTML.

React component

```
function Demo() {
  const who = 'world';
  return <b>Hello {who}</b>;
}
```

Resulting HTML

```
<div>Component: <b>Hello world</b></div>
```

**React Properties**

React components also allow you to pass information to them in the form of element properties. The component receives the properties in its constructor and then can display them when it renders.

```
// JSX

<div>Component: <Demo who="Walke" /><div>

// React component

function Demo(props) {
  return <b>Hello {props.who}</b>;
}

// Resulting HTML

<div>Component: <b>Hello Walke</b></div>
```

**React State**

In addition to properties, a component can have internal state. Component state is created by calling the React.useState hook function. The useState function returns a variable that contains the current state and a function to update the state. The following example creates a state variable called clicked and toggles the click state in the updateClicked function that gets called when the paragraph text is clicked.

```
const Clicker = () => {
  const [clicked, updateClicked] = React.useState(false);

  const onClicked = (e) => {
    updateClicked(!clicked);
  };

  return <p onClick={(e) => onClicked(e)}>clicked: {`${clicked}`}</p>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```

You should note that you can use JSX even without a function. A simple variable representing JSX will work anyplace you would otherwise provide a component.

```
const hello = <div>Hello</div>;

ReactDOM.render(hello, document.getElementById('root'));
```

## Toolchains

- Code repository - Stores code in a shared, versioned, location.

- Linter - Removes, or warns, of non-idiomatic code usage.

- Prettier - Formats code according to a shared standard.

- Transpiler - Compiles code into a different format. For example, from JSX to JavaScript, TypeScript to JavaScript, or SCSS to CSS.

- Polyfill - Generates backward compatible code for supporting old browser versions that do not support the latest standards.

- Bundler - Packages code into bundles for delivery to the browser. This enables compatibility (for example with ES6 module support), or performance (with lazy loading).

- Minifier - Removes whitespace and renames variables in order to make code smaller and more efficient to deploy.

- Testing - Automated tests at multiple levels to ensure correctness.

- Deployment - Automated packaging and delivery of code from the development environment to the production environment.

The toolchain that we use for our React project consists of GitHub as the code repository, Vite for JSX, TS, development and debugging support, ESBuild for converting to ES6 modules and transpiling (with Babel underneath), Rollup for bundling and tree shaking, PostCSS for CSS transpiling, and finally a simple bash script (deployReact.sh) for deployment.

## Vite

For our toolchain we are going to use Vite. Vite bundles your code quickly, has great debugging support, and allows you to easily support JSX, TypeScript, and different CSS flavors. To get started with Vite, let's first build a simple web application. Later we will convert Simon over to React using Vite. This will teach you what you need to know in order to move your startup to React.

To create a new React-based web application using Vite, open your console and run the following commands:

**./**

- index.html	Primary page for the application. This is the starting point to load all of the JSX components beginning with main.jsx.

- package.json	NPM definition for package dependencies and script commands. This is what maps npm run dev to actually start up Vite.

- package-lock.json	Version constraints for included packages (do not edit this).

- vite.config.js	Configuration setting for Vite. Specifically this sets up React for development.

**./public**

- vite.svg	Vite logo for use as favicon and for display in the app.

**./src**

- main.jsx	Entry point for code execution. This simply loads the App component found in App.jsx.
- index.css	CSS for the entire application.
- App.jsx	JSX for top level application component. This displays the logs and implements the click counter.
- App.css	CSS for the top level application component.

**./src/assets**

- react.svg	React logo for display in the app.




## Router

A web framework router provides essential functionality for single-page applications. With a multiple-webpage application the headers, footers, navigation, and common components must be either duplicated in each HTML page, or injected before the server sends the page to the browser. With a single page application, the browser only loads one HTML page and then JavaScript is used to manipulate the DOM and give it the appearance of multiple pages. The router defines the routes a user can take through the application, and automatically manipulates the DOM to display the appropriate framework components.

React does not have a standard router package, and there are many that you can choose from. We will use react-router-dom Version 6. The simplified routing functionality of React-router-dom derives from the project react-router for its core functionality. Do not confuse the two, or versions of react-router-dom before version 6, when reading tutorials and documentation.

A basic implementation of the router consists of a BrowserRouter component that encapsulates the entire application and controls the routing action. The Link, or NavLink, component captures user navigation events and modifies what is rendered by the Routes component by matching up the to and path attributes.

```
// Inject the router into the application root DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // BrowserRouter component that controls what is rendered
  // NavLink component captures user navigation requests
  // Routes component defines what component is routed to
  <BrowserRouter>
    <div className='app'>
      <nav>
        <NavLink to='/'>Home</Link>
        <NavLink to='/about'>About</Link>
        <NavLink to='/users'>Users</Link>
      </nav>

      <main>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/about' element={<About />} />
          <Route path='/users' element={<Users />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
```


## Reactivity

Making the UI react to changes in user input or data, is one of the architectural foundations of React. React enables reactivity with three major pieces of a React component: props, state, and render.

When a component's JSX is rendered, React parses the JSX and creates a list of any references to the component's state or prop objects. React then monitors those objects and if it detects that they have changed it will call the component's render function so that the impact of the change is visualized.

The following example contains two components: a parent <Survey/> component and a child <Question/> component. The Survey has a state named color. The Question has a property named color. The Survey passes its color state to the Question as a property. This means that any change to the Survey's color will also be reflected in the Question's color. This is a powerful means for a parent to control a child's functionality.

The Question component also has a state named answer. The value of answer is displayed as part of the Question's content. The user can interact with this state through HTML radio input elements. When one of the inputs is changed the Question's onChange function is called and the answer state is updated to reflect the user's choice. This automatically causes the display of the answer to be updated.

Be careful about your assumptions of when state is updated. Just because you called updateState does not mean that you can access the updated state on the next line of code. The update happens asynchronously, and therefore you never really know when it is going to happen; you only know that it will eventually happen.

## Hooks

**useEffect hook**

The useEffect hook allows you to represent lifecycle events. For example, if you want to run a function every time the component completes rendering, you could do the following.

```
function UseEffectHookDemo() {
  React.useEffect(() => {
    console.log('rendered');
  });

  return <div>useEffectExample</div>;
}

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
```

**Hook dependencies**

You can control what triggers a useEffect hook by specifying its dependencies. In the following example we have two state variables, but we only want the useEffect hook to be called when the component is initially called and when the first variable is clicked. To accomplish this you pass an array of dependencies as a second parameter to the useEffect call.

```
function UseEffectHookDemo() {
  const [count1, updateCount1] = React.useState(0);
  const [count2, updateCount2] = React.useState(0);

  React.useEffect(() => {
    console.log(`count1 effect triggered ${count1}`);
  }, [count1]);

  return (
    <ol>
      <li onClick={() => updateCount1(count1 + 1)}>Item 1 - {count1}</li>
      <li onClick={() => updateCount2(count2 + 1)}>Item 2 - {count2}</li>
    </ol>
  );
}
```

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
If you specify and empty array [] as the hook dependency then it is only called when the component is first rendered.