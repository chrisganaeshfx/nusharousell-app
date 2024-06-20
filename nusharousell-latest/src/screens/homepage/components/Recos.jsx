import React from "react";
import image from "../../GLOBAL/assets/logos/images.png";

export default function Recommendations() {
  return (
    <div>
      <h3> Recommended for you </h3>
      <br />
      <div className="image">
        <figure>
          <a href="/Screens/product-view/ProductDetail">
            <img src={image} alt="reco1" />
            <figcaption>
              {" "}
              Item Name <br /> Price <br /> Condition <br /> Description{" "}
            </figcaption>
          </a>
        </figure>
        <figure>
          <a href="/Screens/product-view/ProductDetail">
            <img src={image} alt="reco2" />
            <figcaption>
              {" "}
              Item Name <br /> Price <br /> Condition <br /> Description
            </figcaption>
          </a>
        </figure>
        <figure>
          <a href="/Screens/product-view/ProductDetail">
            <img src={image} alt="reco3" />
            <figcaption>
              {" "}
              Item Name <br /> Price <br /> Condition <br /> Description
            </figcaption>
          </a>
        </figure>
      </div>
    </div>
  );
}
