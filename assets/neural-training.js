async function train(){

const model=tf.sequential()

model.add(tf.layers.dense({
units:8,
activation:"relu",
inputShape:[1]
}))

model.add(tf.layers.dense({units:1}))

model.compile({
optimizer:"adam",
loss:"meanSquaredError"
})

const xs=tf.tensor2d([1,2,3,4],[4,1])
const ys=tf.tensor2d([2,4,6,8],[4,1])

await model.fit(xs,ys,{
epochs:40,
callbacks:{
onEpochEnd:(epoch,logs)=>{

document.getElementById("log").innerText+=
"Epoch "+epoch+" loss "+logs.loss+"\n"

}
}
})

}
