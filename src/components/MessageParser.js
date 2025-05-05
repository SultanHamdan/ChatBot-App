class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lower = message.toLowerCase();

    // General Queries
    if (lower.includes("course")) return this.actionProvider.handleCourseOverview();
    if (lower.includes("admission")) return this.actionProvider.handleAdmissionQuery();
    if (lower.includes("facility")) return this.actionProvider.handleFacilityQuery();
    if (lower.includes("computer")) return this.actionProvider.handleCS();

    // Course-specific queries
    const courses = ["bsc", "bcom", "bca", "ba"];
    const topics = ["subjects", "duration", "complexity"];

    for (const course of courses) {
      if (lower.includes(course)) {
        if (lower.includes("subject")) return this.actionProvider.handleCourseDetail(course, "subjects");
        if (lower.includes("duration")) return this.actionProvider.handleCourseDetail(course, "duration");
        if (lower.includes("complexity")) return this.actionProvider.handleCourseDetail(course, "complexity");
        return this.actionProvider.handleCourseDetail(course); // just course name mentioned
      }
    }

    this.actionProvider.defaultCase();
  }
}

export default MessageParser;
