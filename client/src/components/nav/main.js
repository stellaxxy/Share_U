import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import importIcon from '../../assets/images/61183.svg';

class Nav extends Component {
    render(){
        return(
            <nav>
                <ul>
                    <li>
                        <Link to="/"><img className="importIcon" src={importIcon}/></Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Nav;