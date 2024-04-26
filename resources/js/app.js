// console.log("VAishnavi")
import moment from 'moment'



let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('div')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        // console.log(dataProp);
        if (stepCompleted) {
            status.classList.add('step-completed')
        }
        if (dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.orderAt).format('hh:mm A')
            status.appendChild(time)
            // console.log(status.nextElementSibling);
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
        }
    })

}

updateStatus(order);

// let socket = io();

// const admin=document.getElementById("admin").value;
// console.log(admin);

// if(admin){
//     const socket = io();
//     socket.emit('join', 'adminRoom');
//     socket.on('orderPlaced',(data)=>{
//         console.log(data);
//     })
// }

if (order) {
    const id = order._id;
    const socket = io();
    socket.emit('join', id);

    socket.on('orderUpdated', (data) => {
        const updatedOrder = { ...order }
        updatedOrder.orderAt = moment().format();
        updatedOrder.status = data.status;
         updateStatus(updatedOrder);
    })
    
}