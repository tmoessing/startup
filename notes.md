#Notes#
My Web Server http://44.222.228.34/

**Git**
'''
git commit -am "Inital Commit"
'''

**Website**
HTML - Structure
CSS - Style
JavaScript - Interaction
Service - Web service endpoints
Database/Login - Persisted app auth data
WebSocket - Data pushed from server, chat
React - Web framework

**History**
Tim Berners Lee - HMTL (Hypertext Markup Transcript Language)

**Technology Stack**
Host Name - is a website name like byu.edu
DNS (Domain Name System) - Turns Hostname into IP Address

**Creating a Server**
EC2 (Elastic Compute Cloud) - AWS rent a server
Create an instance - make a server
Amazon Machine Image (AMI) - An AMI is a template that contains the software configuration (operating system, application server, and applications) required to launch your instance.

+ used this ami-0b009f6c56cdd83ed for CS260 

Instance Type
+ t- means throttled class so it's slows down if there are lots of people 
+ + use Credit specification select unlimited if want to but be warned someone could spam your server

SSH (Secure Shell Connection) - You can use a key pair to securely connect to your instane

Allow SSH traffic from Anywhere means you will be able to edit access from anywhere

Allow SSH, HTTP, and HTTPS traffic from anywhere.

Click create instance. 

**SSH into your server**
'ssh -i [key pair file] ubuntu@[ip address]'

You may get a warning that your key pair file permissions are too open. If so then you can restrict the permissions on your file so that they are not accessible to all users by running the chmod console command:

'chmod  600 [key pair file]'

As it connects to the server it might warn you that it hasn't seen this server before. You can confidently say yes since you are sure of the identity of this server.

Exit by 'exit'

**Keeping Same public IP address**
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

** Manage your DNS records **
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

** Caddy **
Documentation - https://caddyserver.com/docs/caddyfile
Web Service that listens for incoming HTTP requests. Caddy then either serves up the requested static files or routes the request to another web service. This ability to route requests is called a gateway, or reverse proxy, and allows you to expose multiple web services (i.e. your project services) as a single external web service (i.e. Caddy). Caddy handles web certificates.

For our work we are using the web service Caddy to act as a gateway to our different services and to host our static web application files. Caddy has ACME support built into it by default, and so all you need to do is configure Caddy with the domain name for your web server. Here are the steps to take.

+ Use the ssh console program to shell into your production environment server.
+ Edit Caddy's configuration (Caddyfile) file found in the ubuntu user's home directory.

+ Modify the Caddy rule for handling requests to port 80 (HTTP), to instead handle request for your domain name. By not specifying a port the rule will serve up files using port 443 (HTTPS), and any request to port 80 will automatically redirect the browser to port 443. Replace :80 with your domain name (e.g. myfunkychickens.click). Make sure that you delete the colon.

Save the file and exit
'sudo service caddy restart'