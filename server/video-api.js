var express=require("express");
var cors=require("cors");
var mongoclient=require("mongodb").MongoClient;
var constr="mongodb://localhost:27017";
var app=express();
app.use(cors());
app.use(express.urlencoded({
extended:true
}));
app.use(express.json());
app.get("/admin",(req,res)=>{
mongoclient.connect(constr).then((clientObj)=>{
var database=clientObj.db("reactdb");
database.collection("admin").find({}).toArray().then(documents=>{
res.send(documents);
res.end();
})
})
});
app.get("/categories",(req,res)=>{
mongoclient.connect(constr).then((clientObj)=>{
var database=clientObj.db("reactdb");
database.collection("categories").find({}).toArray().then(documents=>{
res.send(documents);
res.end();
})
})
});
app.get("/videos",(req,res)=>{
mongoclient.connect(constr).then((clientObj)=>{
var database=clientObj.db("reactdb");
database.collection("videos").find({}).toArray().then(documents=>{
res.send(documents);
res.end();
})
})
});
app.get("/users",(req,res)=>{
mongoclient.connect(constr).then((clientObj)=>{
var database=clientObj.db("reactdb");
database.collection("users").find({}).toArray().then(documents=>{
res.send(documents);
res.end();
})
})
});
app.get("/videos/:id",(req,res)=>{
var id=parseInt(req.params.id)
mongoclient.connect(constr).then((clientObj)=>{
var database=clientObj.db("reactdb");
database.collection("videos").find({VideoId:id}).toArray().then(documents=>{
res.send(documents);
res.end();
})
})
});
app.get("/getvideos/:catid",(req,res)=>{
var id=parseInt(req.params.catid)
mongoclient.connect(constr).then((clientObj)=>{
var database=clientObj.db("reactdb");
database.collection("videos").find({CategoryId:id}).toArray().then(documents=>{
res.send(documents);
res.end();
})
})
});
app.post("/addcategory",(req,res)=>{
var category={
CategoryId:parseInt(req.body.CategoryId),
CategoryName:req.body.CategoryName
};
mongoclient.connect(constr).then((clientObj)=>{
var database=clientObj.db("reactdb");
database.collection("categories").insertOne(category).then(()=>{
console.log('Category Inserted');
res.end();
})
})
});
app.post("/addvideo", (req, res) => {
  const video = {
    VideoId: parseInt(req.body.VideoId),
    Title: req.body.Title,
    Url: req.body.Url,
    Likes: parseInt(req.body.Likes),
    Dislikes: parseInt(req.body.Dislikes),  // ✅ note spelling match
    Views: parseInt(req.body.Views),
    CategoryId: parseInt(req.body.CategoryId),
  };

  mongoclient.connect(constr).then((clientObj) => {
    var database = clientObj.db("reactdb");
    database.collection("videos").insertOne(video)
      .then(() => {
        console.log("Video Inserted");
        res.send("Video added");
        res.end();
      })
      .catch(err => res.status(500).send(err));
  });
});


app.post("/registeruser",(req,res)=>{
var user={
UserId:req.body.UserId,
UserName:req.body.UserName,
Password:req.body.Password,
Email:req.body.Email,
Mobile:req.body.Mobile
};
mongoclient.connect(constr).then(clientObj=>{
var database=clientObj.db("reactdb");
database.collection("users").insertOne(user).then(()=>{
console.log('User Inserted');
res.end();
})
})
});
app.put("/updatevideo/:id",(req,res)=>{
var id=parseInt(req.params.id);
var video={
VideoId:parseInt(req.body.VideoId),
Title:req.body.Title,
Url:req.body.Url,
Likes:parseInt(req.body.Likes),
DisLikes:parseInt(req.body.Dislikes),
Views:parseInt(req.body.Views),
CategoryId:parseInt(req.body.CategoryId)
};
mongoclient.connect(constr).then(clientObj=>{
var database=clientObj.db("reactdb");
database.collection("videos").updateOne({VideoId:id},{$set:video}).then(()=>{
console.log('User Inserted');
res.end();
})
})
});
app.delete("/deletevideo/:id",(req,res)=>{
var id=parseInt(req.params.id);
mongoclient.connect(constr).then(clientObj=>{
var database=clientObj.db("reactdb");
database.collection("videos").deleteOne({VideoId:id}).then(()=>{
console.log('Video Deleted');
res.end();
})
})
});
app.listen(5000);
console.log("server started:http://127.0.0.1:5000");