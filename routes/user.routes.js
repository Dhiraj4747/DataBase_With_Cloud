const express = require("express")

const router = express.Router();

router.get("/users",async(req,res)=>{
   const allDbUsers = await User.find({});
   const html = `
   <ul>
      ${allDbUsers
         .map((user)=>`<li>${user.firstName} - ${user.email}</li>`)
         .join("")
      }
   </ul>`;
   res.send(html);

})

router.get("/api/users",async(req,res)=>{
   const allDbUsers = User.find({});
   return res.json(allDbUsers);
})

router
.route("/api/users/:id")
.get(async (req,res)=>{
   const user = await User.findById(req.params.id);
   if(!user) return res.status(404).json({error:"user not found"})
      return res.json(user);
})
.patch(async (req,res)=>{
   await User.findByIdAndUpdate(req.params.id, {})
})