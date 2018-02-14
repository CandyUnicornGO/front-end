import React, { Component } from 'react';

import UnicornPreview from '../components/unicorn/Preview';
import SidebarMenu from '../components/ui/SidebarMenu';
import Card from '../components/Card';

import Search from '../common/Search';
import Dropdown from '../common/Dropdown';
import SideBlock from '../components/ui/SideBlock';
import Tags from '../components/ui/Tags';
import SelectColor from '../components/ui/SelectColor';

const unicorns = [{
  id: 153330988,
  dna: 8890509998,
  name: 'Mr. Incredible Unicorn',
  price: 0.042,
  reproduction: {
    type: 'extra',
    price: 0.00093
  },
  popularity: 23.4453,
  generation: 1,
  tags: ['Nice', 'Gute', 'Usual', 'Just', 'Angry'],
  owner: {
    name: 'Alex Alexeev',
    url: '/alex_alexeev'
  },
  country: 'USA',
  counters: {
    likes: 50,
    views: 150,
    comments: 20
  }
}, {
  id: 153330990,
  dna: 8890677998,
  name: 'Testable unicorn',
  price: 0.082,
  reproduction: {
    type: 'extra',
    price: 0.00052
  },
  popularity: 203.51,
  generation: 3,
  tags: ['Nice', 'Gute', 'Usual', 'Just', 'Angry'],
  owner: {
    name: 'Fe Shallow',
    url: '/fe_shallow'
  },
  country: 'RU',
  counters: {
    likes: 1,
    views: 500,
    comments: 4
  }
}]

//Заглушка для тэгов dropdown
const dropDownList = [
  {id: 0, value: 'All Gens'},
  {id: 1, value: 'Gen - 0'},
  {id: 2, value: 'Gen - 1'},
  {id: 3, value: 'Gen - 2'},
];

class Filter extends Component {
  render() {
    return (
      <section>
        <div className="container-fluid cd-main-content custom-container">
          <div className="row">
            <div className="col-md-2 left-feild">

              <Search onChange={function(){}}/>

            </div>
            <div className="col-md-10 ">
              <div className="for-be-dropdowns">

                <Dropdown iconClass="icon-creative" values={dropDownList} default={2} onChange={function(){}}/>
                <Dropdown iconClass="icon-creative" values={dropDownList} default={0} onChange={function(){}}/>

              </div>
            </div>
          </div>
        </div>
        <div className="s_keywords">
          <div className="container-fluid custom-container">
            <a className="btn color-1 size-3 hover-10"><i className="fa fa-trash-o"></i>clear all filters</a>
            <a className="btn color-6 size-3 hover-10">gen-0 <i className="fa keyword fa-times"></i></a>
            <a className="btn color-6 size-3 hover-10">nice <i className="fa keyword fa-times"></i></a>
            <a className="btn color-6 size-3 hover-10">swift <i className="fa keyword fa-times"></i></a>
            <a className="btn color-6 size-3 hover-10">#ffffff <i className="fa keyword fa-times"></i></a>
          </div>
        </div>
        <div className="container-fluid custom-container">
          <div className="row">

            <div className="col-md-2 left-feild">

              <SideBlock>
                <SidebarMenu title="Coldown"/>
                <Tags title="Popular Tags"/>
                <SelectColor title="More Filtres"/>
              </SideBlock>

            </div>

            <div className="col-md-10">
              <div id="container-mix"  className="row _post-container_">
                {unicorns.map((unicorn) => (
                  <div key={unicorn.id} className="category-1 mix custom-column-5">
                    <Card unicorn={unicorn}/>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
			</section>
    );
  }
}

export default Filter;
