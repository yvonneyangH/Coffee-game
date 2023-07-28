import React, { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UpgradeInfo = (props) => {
  const {coffee} = useSelector(state=>state);
  const selectedUpgrade = props.selected;
  
    return (
        <>
        <div 
          className={ 'show upgrade-info-overlay'} 
          id="exampleModal" 
          tabIndex="-1" 
          role="dialog" 
          aria-labelledby="exampleModalLabel" 
          aria-hidden="true" 
          data-mdb-backdrop="false" 
          data-mdb-keyboard="true"
        >
          <div 
            className="modal-dialog modal-side modal-dialog-left  modal-dialog-centered" 
            role="document" 
            style={{ marginLeft: '5rem', marginRight: 'auto', height: '700px', width: '16vw',minWidth:'210px', maxWidth: '800px' }}
          >
            <div className="modal-content" style={{position:"absolute",top:"2vh",right:"10%"}}>
              <div className="modal-header">
                <h5 className="modal-title"  style={{fontSize:"1rem",fontWeight:"bold"}} id="exampleModalLabel">{selectedUpgrade.id.toUpperCase()}<span>{selectedUpgrade.name.toUpperCase()}</span></h5>
              </div>
              <div className="modal-body" style={{ height: '120px', overflowY: 'auto' }}>
                <p className="describe">{selectedUpgrade.describe}</p>
                {selectedUpgrade.isUpgrade?
                  (<p>Already upgraded</p>)
                  :(<p className="price"style={{fontWeight:"bold"}}>Price: {selectedUpgrade.needTotalCoffee} coffee</p>)
                }     
              </div>
              {
                selectedUpgrade.isUpgrade?(
                  <div className="modal-footer" style={{ height: '50px', overflowY: 'auto' }}>
                      <p className="describe">switch Interior </p>
                  </div>
                ):( 
                  <div className="modal-footer" style={{ height: '50px', overflowY: 'auto',backgroundColor:"" }}>
                    {
                      coffee.coffee>=selectedUpgrade.needTotalCoffee?
                      (<p className="describe" style={{fontWeight:"600"}}>UPGRADE AVAILABLE</p>)
                      :(<p className="describe" style={{fontWeight:"600"}}>NOT ENOUGH COFFEE</p>)
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
    </>
    )
}

export default UpgradeInfo;