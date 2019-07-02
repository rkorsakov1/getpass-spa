import { I18n } from "localization";

export default {
    [I18n.NavigationQA]: 'Q&A',
    [I18n.NavigationAbout]: 'About',
    [I18n.NavigationDownload]: 'Download',
    [I18n.NavigationGenerator]: 'Generator',
    [I18n.NavigationRandom]: 'Random',

    [I18n.q0]: 'What is Getpass?',
    [I18n.a0]: `
Getpass is a stateless cross-platform password manager (generator).  
This tool allows users to generate cryptographically strong passwords based on some input data.

In a nutshell, Getpass uses a hash-like key derivation function (scrypt), that produces the same output password for the same input which contains **Login**, **Website** and a **Secret Keyword**.

This function can not be reversed to retrieve input data given the output.  
For advanced users: check out the settings tab for more features.
`,
    [I18n.q1]: 'How does Getpass work?',
    [I18n.a1]: `
Based on users input and some customizable preferences, scrypt key derivation function produces cryptographically strong password.

Example:  
* Login: **andromeda**  
* Website: **milkyway.com**  
* Secret Keyword: **2,52m light years away**  

Produces password: **3q_q(MFWaMGeao+[CX**
`,
    [I18n.q2]: 'Generation options',
    [I18n.a2]: `
Mostly you **do not need** to configure them and may use default values. (you may find each option explanation in the 'What are the advanced settings section)  
* Password alphabet: numbers, A-Z, a-z, symbols  
* Password length: 18  
* Counter: 0  
* Scrypt parameters: N: 4096, r: 4, p: 1

Note: for desktop or mobile, or web extension version all preferences can be exported / imported (with your logins and websites) when you decide to transfer your data from one device to another, so there is no need to do the same job, adding same information.
`,
    [I18n.q3]: 'What is a Login?',
    [I18n.a3]: `
Login is something that identifies user's account on a specific website.  
It can be user's real login for this website or mail, mobile phone number or anything else.  

For most cases we recommend using real logins for this field as Getpass was designed in a way to generate secure passwords even if Login and Website fields are public.  
Note: “andromeda” and “Andromeda” are different login values (i.e. case sensitive)
`,
    [I18n.q4]: 'What is a Website?',
    [I18n.a4]: `
Website is the name of the website/service user wants to generate password for.  
It can be a real website name (e.g. milkyway.com).  

For most cases we recommend using real website names for the same reasons as mentioned in Login section.  
Note: “milkyway.com”, “milkyway”, “milkyway com” are different website values
`,
    [I18n.q5]: 'What is a Secret Keyword?',
    [I18n.a5]: `
Secret Keyword is a keyword we use to generate cryptographically strong passwords. Think of it as a master password you use to get all the other passwords you need. It can be (and actually, we insist that it must be) any combination of letters, numbers and symbols.  

Note: there is no way to retrieve you Secret Keyword even if you know the login, website and the generated password. This is the most important piece of information and as it’s title says, you must keep it as private as possible
`,
    [I18n.q6]: 'What are the advanced settings?',
    [I18n.a6]: `
* Password length and alphabet. Binds to website. Sometimes there are some restrictions when we speak about generating passwords for specific services. We give users an ability not only to change default password generation preferences, but also (on local versions only) we store this data locally so there is no need to set them each time you need a to generate a password and thus, no need to remember them.  
* Counter. Binds to website. Some service policies require you to change your password once a month, a year and so on. As we've said earlier at Getpass the same input produces the same output. So we implemented a counter variable. Just increase it when you need to change your password without altering website name or changing the secret keyword. This is stored locally like options above.  
* Scrypt parameters. Binds to entire application (i.e. affects everything). Well, you must know what you are doing if you decided to change them. Changing them may not only increase or decrease a complexity, but directly affect password generation time. You must also remember that it takes more time for mobile devices to perform these computations.
You can read about scrypt parameters on [wikipedia](https://en.wikipedia.org/wiki/Scrypt).  

Note: all of these options can be exported / imported (with your logins and websites) when you decided to migrate your data from one device to another, so there is no need to add them on more than one device.
`,
    [I18n.q7]: 'What is this image for, that changes when I enter my Secret Keyword?',
    [I18n.a7]: `
Did you notice that secret keyword is obscured? If yes, than this is a way to visually represent a hash of your Secret Keyword, based on jdenticon library. This is the way to ensure that your Secret Keyword is typed correctly, without revealing the actual letters you have typed.
`,
    [I18n.q8]: 'A note about security',
    [I18n.a8]: `
First of all, Getpass (every platform or service implementation) doesn’t use ANY of your data. Not a single POST request to the hosting or arbitrary server is done. No internet required at all to work with our product. All of the computations are done on  client devices, such as desktop, mobile or web browser (both, extension and getpass.io website). The source code for every platform is available (links in the download section).  

Secondly, there is a small difference between how the local version (mobile, desktop, browser extension) and service version (website getpass.io) treat your data:  
* Service version doesn't store anything at all, but at the same time it doesn't provide some of the local version features. Main use case for the service version: one-time password generation or when you do not have access to any of your local app version.  
* Local version stores locally login and website list (and all the preferences). We insist that login and website are not sensitive pieces of information and could be obtained easily (most of the time it is your phone number or mail address that are used as login, but you can use whatever you want inside this app). The reason that we store this is to give our users better experience when they need to generate a password – just 4 single taps to select login and website. This convenience does not reduce users safety, because, we give users the ability to obscure these values and / or you may use your own way to alias these pieces of data (for example, you may use “git repos” instead of “github” or “google mail” instead of ”gmail”)  

Secret keyword is **never** stored anywhere. That is a crucial piece of information and as it’s title says, you must keep it as private as possible.  

Note every input IS case sensitive! Changing a letter in website or login or secret keyword leads to totally different password.

`,
    [I18n.q9]: 'General security advice',
    [I18n.a9]: `
There are some more and less important services where you want to authenticate from the data safety perspective. No one restricts you from using different secret keywords for different websites (but you must remember which one binds to which one). 

For example, for everyday not important service usage, you may use simple secret keyword, for example: “.NETdev2019”, but for others, maybe your bank account, you could use something more complex like “WhatAGre@t8267TimeToBeA%Developer%!”.
`,
    [I18n.q10]: 'What are the advantages and disadvantages of using Getpass?',
    [I18n.a10]: `
Advantages:  
* App generates different cryptographically strong passwords for every account you want to protect  
* You don’t have to remember anything but your secret keyword.  
* Getpass service is available 24/7 on every device at getpass.io.  
* None of your data is transferred anywhere (not a single POST request to third party servers is send). You secret keyword is not stored (even locally).  
* You don’t have to trust some proprietary software to protect your critical data (you can examine our source codes and help us to improve Getpass as well)

Disadvantages:  
* It takes some time to change your old passwords to Getpass ones (this is every password manager issue, to be honest)  
* Speaking of local policies when you are forced to change your password in some period of time, we can't say that counter solution is an elegant way to do this, but we think that this is the least inconvenient way to implement this functionality  
`,
}