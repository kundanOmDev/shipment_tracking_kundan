const users = [{ id: '1', name: 'kundan',email: "kundan@gmail.com", password: "123456" }, 
{ id: '2', name: 'amar',email: "amar@gmail.com", password: "123456"}]


// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import pool from "../../../../connection/db";

// const handler = NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Login",

//             credentials: {
//                 email: { label: "user", placeholder: "Enter Email"},
//                 password: { label: "Password", type: "password"},
//             },

//             authorize: async (credentials) => {
//                 const client = await pool.connect(); // Move the database connection outside of the try-catch block
        
//                 try {
//                   console.log("Email:", credentials.email); // Log the email
//                   console.log("Password:", credentials.password); // Log the password
        
//                   console.log("I'm here");
//                   if (client) {
//                     console.log("Connected to the database successfully"); // Log a success message
//                   }
        
//                   // Log the SQL query and its parameters
//                   const sql = 'SELECT * FROM users WHERE email = $1 AND password = $2';
//                   const params = [credentials.email, credentials.password];
//                   console.log("SQL Query:", sql);
//                   console.log("SQL Parameters:", params);
        
//                   const result = await client.query(sql, params);
//                   console.log(result.rows, "rowsss");
        
//                   if (result.rows.length > 0) {
//                     const user = result.rows[0];
//                     console.log(user,"user")
        
//                     // Passwords match (not recommended)
//                     return Promise.resolve(user);
//                   }
        
//                   return Promise.resolve(null); // Failed login
//                 } catch (error) {
//                   console.error("Authentication error:", error);
//                   return Promise.resolve(null); // Failed login due to an error
//                 } finally {
//                   client.release();
//                 }
                
//               }
//         }),
//     ],
//     pages:{
//         signIn: "/signIn",
//     },
//     session: {
//         jwt: true,
//         maxAge: 600,
//     },
//     callbacks: {
//         async jwt({token, user,session}) {
//           console.log("User object:", { user}); //
//           if (user) {
//             console.log("I'm hereeeeeeee");
//             token.email = user.email; 
//           }
    
//           return { ...token, ...user }
//         },
//         async session({session, token}) {
//           console.log(token,'hhhhhhhhhhhhhh');
//           // Add the token data to the session
//           session.user = token;
//           // session.maxAge = token.maxAge || session.maxAge;
//           return session;
//           // session.user = token;
//           // return session;
//         }
//       }
// });

// export { handler as GET, handler as POST};   