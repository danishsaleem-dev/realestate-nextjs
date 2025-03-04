'use client';
import React from 'react'
import { useState } from 'react';

const ContactForm = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        reason: '',
        message: ''
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add API call or further processing here
      };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg bg-white"
          />
        </div>

        <div>
          <label className="block font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg bg-white"
          />
        </div>

        <div>
          <label className="block font-medium">Reason for Contact</label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="">Select a reason</option>
            <option value="support">Support</option>
            <option value="sales">Sales</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">How can we help you?</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-lg bg-white"
          ></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Submit</button>
      </form>
    </div>
  )
}

export default ContactForm