---
layout: post
title: 11 things to remember when writing a user guide
date: '2013-09-11T13:00:06.000Z'
comments: true
author: Don Schenck
published: true
categories:
  - General
---

One of the more pressing needs in the world of open source software is the need
for decent documentation. That covers a lot of territory; from well-commented
code (yeah… right) to API guides to the rare – some say mythical – user guide.

It's that last one, the user guide, that is often either not created or –
perhaps worse – created as an afterthought by a developer whose writing skills
are better aligned with Javascript than [Strunk][1]. When I joined the Developer
Relations Group at Rackspace in July (be sure to check out the
[Rackspace Developer Center][2] if you haven't already), I immediately decided
to create a user guide for the [OpenStack SDK for Microsoft .NET][3]. While
creating that document, I realized that many developers don't have a passion
for writing documentation. Fair enough – I've never watched Game of Thrones.
So, as a former sportswriter and an active coder (C# is my poison, mobile apps
my passion), I have come up with a list of guidelines to help you craft a
Pulitzer-worthy user guide. These suggestions (11 of them, yup, my list goes to 11!)
were not developed through any sort of scientific process; rather, they are the
result of more years of experience than I care to admit.

<!-- more -->

1. <h4>Assume your audience knows very little about the subject and nothing about your software.</h4>

	If you're writing a user guide for, say, the hottest open source ticket in
	town, C# on Rails, you should assume your audience will know something about
	C#. They might know something about MVC. They know nothing about Rails. You're
	not teaching C#, you're teaching Rails. Remember, this is a user guide that
	may be read by a junior developer or student moving into a new technology.
	Don't insult their intelligence, but don't scare them away.


2. <h4>Don't assume everyone knows every acronym. Avoid [TLAs][4].</h4>

	FYI, you can lose people PDQ if every TLA in your OSS doc isn't A-OK.

	Seriously, don’t assume that folks know every acronym you can think of. Even
	everyday things such as TDD and AOP might be obscure to them. Be polite;
	mention the long form first. THX.


3. <h4>Describe; then demonstrate.</h4>

	You’ve heard the phrase "Don’t tell me what you know; show me." Well, when
	writing a user guide, do both. Describe what you’re going to do – a real-world
	scenario is the best example – and then show the code. Then, use that
	explanation and code to build upon. If the user knows what is about to happen,
	they’ll be comfortable and anxious to learn and understand.

4. <h4>Include real-world examples and scenarios.</h4>

	If you can include an example that would, should or could actually happen,
	you’ll bring not only a level of comfort to the user (“Oh yeah! This I can
	use!”), but you’ll also give them actual code they can actually use.
	Connecting a computer to a toaster isn’t nearly as helpful as, say,
	connecting a computer to an automobile diagnostic system.

	(Don’t laugh; back in the early 90s, a company had a demo where they actually
	connected an AS/400 minicomputer to a toaster. Two things: I told told you
	I’ve been around forever; and really? A toaster? REALLY?)

5.	<h4>Include code. USEABLE code. Make sure it actually works.</h4>

	This is easy. Make sure the code you include actually works. You know what’s
	more frustrating than a lack of code? Code that’s wrong. Make sure it works.

	How do you do this? Easy, get other people to run the code on their systems.

6.	<h4>Code: It's there to teach about and demonstrate your code. It is not there to teach coding.</h4>

	In our example, C# on Rails (“But Don, you said include real-world examples,
	and we all know C# on Rails doesn’t exist. I cry ‘foul!’”.), you’re teaching
	… uh … C# on Rails. You’re not teaching C#. Enjoy this, relish it, soak it
	in. For you are free to both assume some level of knowledge and, at the same
	time, free to go outside the bounds of “good code.”.

	HUH?

	That’s right! Behold, guideline number seven!”

7.	<h4>Code: If in doubt, keep it simple. You can violate some rules (that is, [DRY][5]) in the interest of teaching, keeping important sections of code grouped together, etc.</h4>

	Come on, admit it, you know you want to copy-and-paste code and duplicate
	your efforts and you’d love to not inherit from a base class just this once.

	Well, here’s your chance. Let the Code Police scream! You’re showing how to
	use your project, not teaching CompSci 101. Be pragmatic and let the purists
	stroke their neck beards and gripe – you’ll be basking in the open source
	sunlight on a beach somewhere.

8.	<h4>Don't include too much. Remember It's a Getting Started guide.</h4>

	You’re not writing their CRM system (“Don! That’s a TLA!”), you’re showing
	how to use your code. Don’t try to do everything, just enough to get them
	rolling. To that end…

9.	<h4>Leave them wanting more.</h4>

   Your tendency will be toward showing off everything. Don’t.

	First of all, it’s a Getting Started guide, not a book. You can always create
	an advanced guide or cookbook. This is not the time nor place. You’re getting
	them started and moving them in the right direction so they can working on
	their own.

	Also, there’s a concept in the world of design known as “discovery.” It’s
	where you don’t show or tell everything, but rather leave things for the user
	to discover. This is a very powerful and often-overlooked concept. It rewards
	and attracts the viewer as they discover some new feature. It creates an
	investment as the user realizes that they’re finding, learning and using new
	things. Steer them in the right direction and then turn them loose – they’ll
	end up doing things you never imagined.

10.	<h4>Lists should be numbered.</h4>

   This is personal for me. If I were King of the World, all lists would be
   numbered. Honestly, it just makes life easier to refer to “item number four”
   instead of “Yeah, the idea of real-world example…” Do this all the time. I
   and the rest of the world will thank you.

11.	<h4>All lists should have an odd number.</h4>

	Some marketing person somewhere told me this. I don’t believe it, but whatever.
	This list goes to 11  – Spinal Tap would be proud.

Go. Write. Inform. The world needs your user guide.

Numbered, of course.

Click the following links for more information about the
[OpenStack SDK for Microsoft .NET][6]. Check out Don’s article, a
[guide for .NET developers into the world of open source.][7]


  [1]: http://en.wikipedia.org/wiki/The_Elements_of_Style
  [2]: https://developer.rackspace.com/
  [3]: https://github.com/openstacknetsdk/openstack.net/wiki/Getting-Started-With-The-OpenStack-NET-SDK
  [4]: http://en.wikipedia.org/wiki/Three-letter_acronym
  [5]: http://en.wikipedia.org/wiki/Don%27t_repeat_yourself
  [6]: http://openstacknetsdk.org/
  [7]: http://www.rackspace.com/blog/a-net-developers-guide-to-the-world-of-open-source/
