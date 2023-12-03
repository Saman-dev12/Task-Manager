"use client";
import React from "react";

const page = () => {
  return (
    <div className="h-auto">
      <section className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-3xl">About Our Task Manager App</h1>
      </section>

      <section className="container mx-auto my-8">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to our Task Manager
        </h2>
        <p className="text-gray-800">
          A powerful and intuitive application designed to streamline your daily
          tasks and boost productivity.
        </p>
      </section>

      <section className="container mx-auto my-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-gray-800">
          <li>
            <strong>User-Friendly Interface:</strong> Our app offers an
            easy-to-navigate interface, ensuring a smooth and enjoyable user
            experience.
          </li>
          <li>
            <strong>Task Organization:</strong> Categorize your tasks into
            projects, set due dates, and prioritize your workload. Stay
            organized and focused on what matters most.
          </li>
          <li>
            <strong>Real-time Collaboration:</strong> Collaborate seamlessly
            with team members, friends, or family. Our real-time synchronization
            ensures everyone stays on the same page, making teamwork more
            effective.
          </li>
          <li>
            <strong>Reminders and Notifications:</strong> Never miss a deadline
            again. Set reminders for your tasks and receive notifications to
            keep you informed and on track.
          </li>
          <li>
            <strong>Mobile Accessibility:</strong> Access your tasks anytime,
            anywhere. Our app is fully responsive, allowing you to manage your
            tasks on the go using your smartphone or tablet.
          </li>
        </ul>
      </section>

      <section className="container mx-auto my-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-800">
          At Taskings, we are committed to providing a task management solution
          that adapts to your unique needs. Our mission is to empower
          individuals and teams to achieve their goals with efficiency and
          clarity.
        </p>
      </section>

      <section className="container mx-auto my-8">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-800">
          <li>
            <strong>Security:</strong> Your data's security is our top priority.
            With state-of-the-art encryption and secure protocols, you can trust
            us to keep your information safe.
          </li>
          <li>
            <strong>Constant Improvement:</strong> We are continuously working
            to enhance and expand our features based on user feedback. Your
            suggestions are valuable to us in shaping the future of our app.
          </li>
          <li>
            <strong>Free to Use:</strong> Enjoy the benefits of a premium task
            manager without any cost. Our app is free to use, with no hidden
            fees or subscriptions.
          </li>
        </ul>
      </section>

      <section className="container mx-auto my-8">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-gray-800">
          Ready to take control of your tasks? Sign up for free today and
          experience the difference with Taskings Task Manager.
        </p>
      </section>
    </div>
  );
};

export default page;
