import {NextAuthOptions} from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {jwtDecode} from "jwt-decode"




export const nextAuthConfig : NextAuthOptions = {

  providers:[

    Credentials({

      // name: "fresh cart",
      
      credentials:{
        email:{},
        password:{},
      },
     async authorize(credentials){
        const res = await fetch(
            `${process.env.API}auth/signin`,
            {
              body: JSON.stringify(credentials),
              method: "Post",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          const finalRes = await res.json();
          console.log(finalRes);
        
          if(finalRes.message == "success"){
            const tokenData = jwtDecode<{id : string}>(finalRes.token)
            const data ={
               name: finalRes.user.name,
              email:finalRes.user.email,
              realTokenFromBackEnd: finalRes.token,
              id: tokenData.id,
            }
            console.log("Data==>" , data);
            

            return{
              name: finalRes.user.name,
              email:finalRes.user.email,
              realTokenFromBackEnd: finalRes.token,
              id: tokenData.id,
             
              
            }



          }
            throw new Error(res.statusText)
        
      }
    })
  ],


  callbacks:{
    jwt(params) {

      if(params.user){
        params.token.realTokenFromBackEnd = params.user.realTokenFromBackEnd
        params.token.id = params.user.id
         

      }
      console.log( "params from jwt"  , params);

      return params.token
      
    },

    session({session , token}){
      session.user.id = token.id 
     

      console.log("params from session" , session);
      

      return session
    },


  },
  session:{
    maxAge: 60 * 60 * 24
  },


  pages:{
    signIn:"/login"
  }


}