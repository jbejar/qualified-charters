import React from 'react';
import SchoolTable from './SchoolTable';
export default function HomePage() {
    return (
        <div class="container">    
            
            <div class="jumbotron">
                <h3 class="display-4">Search for Your Charter School Up Top</h3>
                <hr class="my-2"/>
                <img width="500" src="/Qualified.png" className="img-fluid rounded" alt=""/>    
                <h3>How do Utah Schools Charter Schools Compare?</h3>
            </div>
            <SchoolTable/>
            <div>
                <h4>Notes:</h4>
                <p>
                Recently Utah has changed how licenses work, and created a system with three different
                kinds of teaching licenses to help parents understand what kind of training their students
                teachers have:
                </p>

                <img src="NewLicenses.png" width="415"></img>
                <p>
                This new system will help make the system more clear than in the time past. Currently the
                State of Utah is updating their <a href="https://cactus.schools.utah.gov/PersonSearch">website</a>.
                </p>
                <p><iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/kyXiScYh4jA?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;start=1485&amp;width=560&amp;width=560" width="560" height="315" allowtransparency="true" frameborder="0"></iframe>
                </p>
                
                <p/>
                The information contained for this website still are under the old rules, more information about the rule changes in available on 
                the Utah State Board of Education <a href="https://www.schools.utah.gov/curr/licensing">website</a>.
            </div>
        </div>
    )
}
