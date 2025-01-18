import React from 'react'

export default function Card({id, title, description, date, displayTaskForUpdate, deleteTask}) {
  let formatedDate = new Date(date);
  formatedDate = formatedDate.toString().split("GMT")[0];
  
  return (
    <div className="container p-2">
        <article className='message'>
            {/* Message */}
            <div className="message-header">
                <p>{title}</p>
                <div>
                  <button className='button is-primary mr-3' onClick={()=>{displayTaskForUpdate(id,title,description);}}><i className='fa-solid fa-pen-to-square'></i></button>
                  <button className="delete m-1" aria-label="delete" onClick={()=>deleteTask(id)}></button>
                </div>

                {/* <button className="delete" aria-label="delete" onClick={()=>supprCard(index)}></button> */}
            </div>

            {/* Content */}
            <div className="message-body has-text-weight-medium">
                <p>{description}</p>
                <span className="is-pulled-right is-size-7">{formatedDate}</span>
            </div>
        </article>
    </div>
  )
}
