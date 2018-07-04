call and video ui:

    pages/home/home.html  line 127, line 134

    you can find function call("","");

        function create "contact modal"

        on contact modal calls "triggerCall" function of call service.      


call and video service:

    services/call.ts

        triggercall calls socket service.


socket service:

    services/socket.ts
    

