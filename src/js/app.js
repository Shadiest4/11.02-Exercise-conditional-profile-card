import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "position-right", // social media bar position (position-left or position-right)
        //for social media links, only update usernames
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console

  // Cover: show image only if includeCover is true and there's a background URL
  let cover = variables.includeCover
    ? `<div class="cover"><img src="${variables.background}" /></div>`
    : `<div class="cover"></div>`;

  // Avatar: show photo or a placeholder silhouette
  let avatar = variables.avatarURL
    ? `<img src="${variables.avatarURL}" class="photo" />`
    : `<img src="https://via.placeholder.com/100/cccccc/ffffff?text=?" class="photo" />`;

  // Name: show h1 with real value or placeholder text in grey
  let fullName = [variables.name, variables.lastName].filter(Boolean).join(" ");
  let nameHTML = fullName
    ? `<h1>${fullName}</h1>`
    : `<h1 class="placeholder">Your Name</h1>`;

  // Role: show h2 with real value or placeholder
  let roleHTML = variables.role
    ? `<h2>${variables.role}</h2>`
    : `<h2 class="placeholder">Your Role</h2>`;

  // Location: show h3 with real value or placeholder
  let location = [variables.city, variables.country].filter(Boolean).join(", ");
  let locationHTML = location
    ? `<h3>${location}</h3>`
    : `<h3 class="placeholder">City, Country</h3>`;

  // Social media links: real link if username exists, greyed-out icon if null
  let twitterHTML = variables.twitter
    ? `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
    : `<li><a href="#" class="placeholder"><i class="fab fa-twitter"></i></a></li>`;
  let githubHTML = variables.github
    ? `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
    : `<li><a href="#" class="placeholder"><i class="fab fa-github"></i></a></li>`;
  let linkedinHTML = variables.linkedin
    ? `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
    : `<li><a href="#" class="placeholder"><i class="fab fa-linkedin"></i></a></li>`;
  let instagramHTML = variables.instagram
    ? `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
    : `<li><a href="#" class="placeholder"><i class="fab fa-instagram"></i></a></li>`;

  // Social media list: use the socialMediaPosition class for positioning
  let socialHTML = `<ul class="${variables.socialMediaPosition}">
    ${twitterHTML}
    ${githubHTML}
    ${linkedinHTML}
    ${instagramHTML}
  </ul>`;

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
      ${cover}
      ${avatar}
      ${nameHTML}
      ${roleHTML}
      ${locationHTML}
      ${socialHTML}
    </div>
  `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (position-left or position-right)
    socialMediaPosition: "position-right",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
