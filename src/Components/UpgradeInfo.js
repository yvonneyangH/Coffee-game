import React, { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UpgradeInfo = () => {
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
            style={{ marginLeft: '5rem', marginRight: 'auto', height: '700px', width: '12vw', maxWidth: '800px' }}
          >
            <div className="modal-content" style={{position:"absolute",top:"2vh",right:"-2vw"}}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ height: '200px', overflowY: 'auto' }}>
              </div>
             
            </div>
          </div>
        </div>
    </>
    )
}

export default UpgradeInfo;