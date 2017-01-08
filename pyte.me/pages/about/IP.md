---
title: About Us
---

## Layer 3 -  Internet Protocol Layer


layer 3 allows logical grouping of the ip addresses. Nomally routing table of the normal hosts is one that is of the gateway. Layer 3 task is fragmentation. Layer 2 also does the fragmentation. In wifi

Layer 2 is going to handle the layer3 packets and may fragment it if they are large. All l2 devices wi

![ipv4 header](https://upload.wikimedia.org/wikipedia/commons/f/f9/IPv4_header_%281%29.png)


Destination receiving the fragments, may not receive them in the same order, so it is going to reassebe and hand it over to the layer 3. 

Flags

* bit 0: Reserved; must be zero.[note 1]
* bit 1: Don't Fragment (DF)
* bit 2: More Fragments (MF)

the destination hop will assemble all the packets. 
If MF is 0 and Offset is 0 it is the only packet.
If MF is 0 and offset is non 0 then it is the last packet.

identification comes from a counter a random number incremented with each ip address.

Program trace uses this identification field to tell the topology of the internet.

All layers are going to add their headers and and send to lower layers, encapsulation 

decapsulation is the reverse thing 

MTU at the core of the internet has large MTU. minimum MTU of a path is going to be close to the source.


Oneway to determine the least MTU is ping the destination


```python
packetsize=1500
mtu=420
identifier=0
mf=False
offset=0
q,r=divmod(packetsize,mtu)
if q:
    mf=True
packets=[]
for i in xrange(q):
    packets.append((identifier,mf,offset))
    identifier+=1
    offset+=mtu
mf=False
packets.append((identifier,mf,offset))

print packets
```

    [(0, True, 0), (1, True, 420), (2, True, 840), (3, False, 1260)]
    


```python

```

Each router in the internet does not know the full view of the internet. Routing protocols each neighbour. Each router on the internet scale configuration. Router should know next hop to the destination on the internet, using the routing protocols. The main objective is reachability.

I can pick based on shortest path, least congested path , least costly path, next hop.

Routing protocols types

* Distance vector routing protocols.
.. RIP
* Link state routing protocols.
.. OSPF 

Forwarding is lookup a table and tell the next hop.
Routing gets the table somehow using routing protocols.

Exchange control packets to end up in a table.
Routing is process of coming up with tables
Forwarding is process of looking up the tables.

loadbalancing

when a packet traverses the internet, the destination address does not change ttl and checksum changes.

**BGP runs a tweak on Distance Vector Protocol

egree point  ATnT or SPRINT to level 3 



```python
Hs wants to connect to the network Hs to Hd, d can be a web server,
```

On the internet it is simply connectivity.
Router will pick the capable link. Across the domian the capability depends on the policies rather than link capacities. Egress point. Within a domain policies dont, when we route across a domain the 
Metric - number of hops, queueing delay, propagation delay, bandwidth, ...)

Router protocols 

Scalability of the routing protocol.
Effcient: Can't use 90% of the bandwidth
safe - interconnection of different organisations
self healing
multiple metrics: QOS price, politics
paths should be "optimal"


Centralized vs decentralized
centralized router has the routes
internet is decentralized
static vs adaptive

Intra-domain routing IGP: RIP , OSPF
Inter-domain routing EGP: BGP

Distance-Vector (DV) Routing
Bellman-Ford shortest Path

Used by many protocols: RIP, BGP, SO IDRP, Novel IPX

Cij 
Cii=0
Cij = mink(

every 3 seconds we get the db from the neighbours.

after the diameter of the network.
minimal distance between maximally distant nodes of the network.
We can detect infinite loop we can see the metric going beyond diameter of the network.
The routing table will be unstable until for sometime until

Split horizon, advertisements go in one direction

some advertisements go in one direction, and other advertisements go in other direction.

BGP is a variant of Distance Vector, it has no routing loops. If the edge networks we will not have loops.

scalability issues.
