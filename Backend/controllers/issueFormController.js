import formModel from '../models/formModel.js';

const issueformSubmit = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    // Save form data to the database
    const newIssue = await formModel.create({
      name,
      email,
      issue: subject,
      message,
    });

    // Success response
    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: newIssue,
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
};

export { issueformSubmit };
