# Solr模式配置与数据导入调研 #

## 模式配置Schema.xml ##

### types字段 ###
> 是一些常见的可重用定义，定义了 Solr（和 Lucene）如何处理 Field。也就是添加到索引中的xml文件属性中的类型，如int、text、date等

```
<fieldType name="string" class="solr.StrField" sortMissingLast="true"/>
<fieldType name="boolean" class="solr.BoolField" sortMissingLast="true"/>
```
### fileds字段 ###
> 是你添加到索引文件中出现的属性名称，而声明类型就需要用到上面的types

+ 固定字段设置
```
<field name="id" type="string" indexed="true" stored="true" required="true" multiValued="false"/>
<field name="path" type="text_smartcn" indexed="false" stored="true" multiValued="false" termVector="true" />
<field name="content" type="text_smartcn" indexed="false" stored="true" multiValued="false" termVector="true"/>
```

+ dynamicField（动态字段设置）
> 动态的字段设置,用于后期自定义字段,*号通配符.例如: test_i就是int类型的动态字段

```
<dynamicField name="*_i" type="int" indexed="true" stored="true"/>
<dynamicField name="*_l" type="long" indexed="true" stored="true"/>
<dynamicField name="*_s" type="string" indexed="true" stored="true" />
```
+ copyField（特殊字段设置）
> 一般用于检索时用的字段这样就只对这一个字段进行索引分词就行了copyField的dest字段如果有多个source一定要设置multiValued=true,否则会报错的

```
<copyField source="content" dest="pinyin"/>
<copyField source="content" dest="text"/>
<copyField source="pinyin" dest="text"/>
```


## Solr的数据导入方式 ##
### post.jar ###
> 使用自带的post.jar工具，需要提前自己定义好需要上传文件的格式（最好是以XML或者是json的格式，似乎可以是pdf，以及txt等格式，如上面所述，但是这一部分确实可以上传，但是在后续的搜索的过程中找不到相应的数据，需要进一步的研究，但是XML以及json的格式一定是没有问题了）


```
Automatically detect the content type based on the file extension.
java -Dauto=yes -jar post.jar a.pdf
```

```
Automatically detect content types in a folder, and recursively scan it for documents.
java -Dauto=yes -Drecursive=yes -jar post.jar afolder
```

```
Automatically detect content types in a folder, but limit it to PPT and HTML files.
java -Dauto=yes -Dfiletypes=ppt,html -jar post.jar afolder
```

### 使用用户界面进行数据的导入 ###
> 略，Solr的用户界面足够友好，可以直接通过手动导入的方式完成

### 使用接口库 ###
> 我在调研的时候使用的是pysolr，是基于Python的，其实还有solrj是基于java的后者没有调研过，但是前者调研过感觉还不错，增删改查都能做，还不错。
> 教程网址：https://pypi.python.org/pypi/pysolr/3.2.0
