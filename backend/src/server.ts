import app from "./app";

app.listen(9000, () => {
  console.log(
    "Server started on port 9000 in " + process.env.NODE_ENV + " mode"
  );
});
