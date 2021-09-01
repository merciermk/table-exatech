### main.ts 

dans import + library.add

````
faTimes, faAlignJustify
````



### CSS
style css ligne 154: 

#### ajout dans .toggle-btn + rajout de .toggle-btn-icon
````css
.toggle-btn {
  display: flex;
  flex-wrap: no-wrap;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  min-height: 40px;
  visibility: hidden;
  z-index: 1041 !important;
  color: $btn-color;
  position: fixed;
  margin-top: 95px;
  background-color: $btn-bg-color;
  transition: linear 0.5s;
  border-radius: 0px 5px 5px 0;
}

.toggle-btn-icon{
  font-size: 20px
}
````

### SideBarLeft

ligne 88 : 

```` html
 <!-- Button Wrap -->
      <div class="toggle-btn" :class="toggled ? 'btn-is-close' : 'btn-is-open'" @click="toggled ? openNavbar() : closeNavbar()">
        <font-awesome-icon
          :icon="buttonIcon"
          aria-hidden="true"
          class="toggle-btn-icon"
        />
      </div>
````

## fix fleche dernier élément

````
.lastElement{
  justify-self: flex-end;
  width: $nav-extended;
  margin-top: auto;
  margin-bottom: 0px;
  .collapsed > .accordion-state {
    transform: rotate(-90deg);
  }
  .accordion-state {
    transform: rotate(90deg);
  }
}
````