// class ActionProvider {
//     constructor(createChatBotMessage, setStateFunc) {
//       this.createChatBotMessage = createChatBotMessage;
//       this.setState = setStateFunc;
//     }
  
//     sendMessage = (text) => {
//       const msg = this.createChatBotMessage(text);
//       this.setState((prev) => ({ ...prev, messages: [...prev.messages, msg] }));
//     };
  
//     handleCourseOverview = () => {
//       this.sendMessage("We offer BSc, BCom, BCA, and BA programs.");
//     };
  
//     handleCourseDetail = (course, topic) => {
//       const courseData = {
//         bsc: {
//           intro: "What would you like to know more about BSc?",
//           subjects: "BSc consists of 2 subjects: Math and Computers.",
//           duration: "The course duration of BSc is 3 years.",
//           complexity: "BSc is moderately complex, especially for those comfortable with math and logical reasoning.",
//         },
//         bcom: {
//           intro: "What would you like to know more about BCom?",
//           subjects: "BCom consists of 2 subjects: Accounting and Economics.",
//           duration: "The course duration of BCom is 3 years.",
//           complexity: "BCom is considered to be the least complex and manageable with basic math and theory.",
//         },
//         bca: {
//           intro: "What would you like to know more about BCA?",
//           subjects: "BCA consists of 2 subjects: Math and Computers.",
//           duration: "The course duration of BCA is 3 years.",
//           complexity: "BCA is the most complex due to programming, logic building, and technical concepts.",
//         },
//         ba: {
//           intro: "What would you like to know more about BA?",
//           subjects: "BA consists of 2 subjects: History and Literature.",
//           duration: "The course duration of BA is 3 years.",
//           complexity: "BA is easier for students with interest in reading, writing, and humanities.",
//         },
//       };
  
//       const data = courseData[course.toLowerCase()];
//       if (!data) return this.sendMessage("Course not found.");
  
//       if (!topic) return this.sendMessage(data.intro);
  
//       if (!data[topic]) return this.sendMessage("Information not available for that topic.");
//       this.sendMessage(data[topic]);
//     };
  
//     handleAdmissionQuery = () => {
//       this.sendMessage("Admissions are open from May to July. Apply online.");
//     };
  
//     handleFacilityQuery = () => {
//       this.sendMessage("We have a library, computer labs, sports, and hostels.");
//     };
  
//     handleCS = () => {
//       this.sendMessage("If you're interested in computer science, it's better to go with BCA or BSc.");
//     };
  
//     defaultCase = () => {
//       this.sendMessage("Sorry, I can't help you with that.");
//     };
//   }
  
//   export default ActionProvider;
  