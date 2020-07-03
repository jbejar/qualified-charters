import React from 'react'

export default function HomePage() {
    return (
        <div class="container">    
            
            <div class="jumbotron">
                <h3 class="display-4">Search for a Charter School up Top</h3>
                <hr class="my-2"/>
                <img width="500" src="/Qualified.png" className="img-fluid rounded" alt=""/>    
                <h3>How do Utah Schools Charter Schools Compare?</h3>
            </div>
            <div>
                <h4>Notes:</h4>
                Recently Utah has changed how licenses work, and created a system with three different
                kinds of teaching licenses to help parents understand what kind of training their students
                teachers have:
                <p>
                <img src="NewLicenses.png" width="415"></img>
                </p>
                This new system will help make the system more clear than in the time past. Currently the
                State of Utah is updating their <a href="https://cactus.schools.utah.gov/PersonSearch">website</a>.
                <p/>
                The information contained for this website still are under the old rules.
            </div>
        </div>
    )
}
