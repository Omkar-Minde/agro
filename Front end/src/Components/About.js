import React from 'react'
import trust from '../assets/Farmer-Trust.png'

export default function About() {
    return (
        <div>
            <div class="aboutbanner_info">
                <div class="container_info">
                    <div class="aboutbanner_list">
                        <div class="aboutbanner_cont">
                            <h3 class="col-lg-12 col-sm-12 border text-align-center justify-content-center" style={{ color: "ge", marginLeft: "355px" }}>
                                Its supply chain platform direct from farmers to customers
                                <br />

                            </h3>
                        </div>

                        <div class="col-lg-4 col-sm-12 border text-align-right justify-content-right">
                            <img src={trust} alt="" style={{ objectFit: "cover", height: "500px", width: "1350px", align: "left" }} />

                        </div>
                    </div>
                </div>
            </div>

            <div class="theinceptionjourney_info">
                <div class="container_info">
                    <div class="theinceptionjourney_list" >
                        <h3 style={{ marginLeft: "1px" }}> Supply Chain </h3>
                        <p>Digital and smart supply chains are reforming the food chain to help eliminate
                            waste, improve food safety, and reduce the possibility of a global food catastrophe. The globe
                            currently faces numerous food-related issues, ranging from a lack of biodiversity to excessive waste,
                            and from ill health caused by excessive consumption to widespread food insecurity. It is time to
                            look back at how technology has tackled food supply-chain challenges related to quality, safety,
                            and sustainability over the last decade. Moreover, continuous transformations of the food supply
                            chain into a more sustainable business model with utmost resilience is the need of the hour due
                            to COVID-19 disruptions..</p>
                        <p>We connect individual customer,group of customers like institiues to farmers for purchasing products</p>
                    </div>
                </div>
                <div class="theinceptionjourney_bg"></div>
            </div>
        </div>
    )
}
